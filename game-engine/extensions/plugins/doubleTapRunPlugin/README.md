# doubleTapRunPlugin

Detects a double-tap on any direction key and activates run mode in Redux. Works with **any** input source that dispatches DOM `keydown`/`keyup` events

## How it works

`DoubleTapRunHandler` registers its own `window` listeners in `init()` and removes them in `deinit()`. On each key event it runs the double-tap timing logic (`doubleTapLogic.ts`) and dispatches `setIsRunning(true/false)` to Redux.

A 150 ms grace period (`MOBILE_GRACE_PERIOD_MS`) keeps run active when the user briefly lifts a finger between direction buttons — critical for smooth virtual keyboard use.

## Installation

1. Add `runReducer` to your Redux store:

```ts
import { runReducer } from "game-engine/extensions/plugins/doubleTapRunPlugin";

const makeStore = () =>
    configureStore({
        reducer: {
            [DOUBLE_TAP_RUN_PLUGIN_ID]: runReducer,
            // ...
        },
    });
```

2. Add `DoubleTapRunHandler` to the `plugins` array in `GameLoop.getInstance`:

```tsx
import { DoubleTapRunHandler } from "game-engine/extensions/plugins/doubleTapRunPlugin";

GameLoop.getInstance({
    plugins: [
        new KeyboardEventHandler({ dispatch }),
        new DoubleTapRunHandler({
            dispatch,
            // Return true while modals/dialogs are open to suppress run detection.
            getIsBlocked: () => {
                const state = store.getState();
                return state.modal.isOpenModalWindow || state.dialog.isOpenDialogWindow;
            },
        }),
        // ...
    ],
    modules: [
        /* ... */
    ],
});
```

## Config options

| Option          | Type            | Default       | Description                                  |
| --------------- | --------------- | ------------- | -------------------------------------------- |
| `dispatch`      | Redux dispatch  | required      | Used to dispatch `setIsRunning`              |
| `directionKeys` | `Set<string>`   | WASD + arrows | Keys that trigger double-tap detection       |
| `getIsBlocked`  | `() => boolean` | `() => false` | Suppresses detection (e.g. modal open)       |
| `gracePeriodMs` | `number`        | `150`         | Ms to keep run active after all keys release |

## Input source independence

This plugin listens directly to `window keydown/keyup`. Any plugin that dispatches real DOM `KeyboardEvent`s on `window` (e.g. `VirtualKeyboardHandler`) will trigger double-tap detection automatically — no wiring needed.
