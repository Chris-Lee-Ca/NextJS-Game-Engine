# virtualKeyboardPlugin

Provides on-screen touch/mouse buttons that dispatch real DOM `KeyboardEvent`s on `window`, making virtual input completely transparent to every other plugin and module. No module ever needs to know a virtual keyboard exists.

## How it works

`VirtualKeyboardHandler` exposes two methods: `dispatchKeyDown(key)` and `dispatchKeyUp(key)`. Each method calls `window.dispatchEvent(new KeyboardEvent(...))`, which any plugin listening to `window keydown/keyup` receives automatically — exactly as if a physical key had been pressed.

`VirtualKeyboardButton` is an engine-provided React component that calls these methods using the **Pointer Events API** (`onPointerDown` / global `pointerup`), which fires immediately on both mouse and touch with no 300 ms synthetic delay.

## Soft dependency on KeyboardEventPlugin

`VirtualKeyboardHandler` has **no code-level dependency** on `KeyboardEventPlugin`. This is intentional — the DOM event is the shared bus; any plugin can listen to it.

However, for direction/action modules (`DirectionControlHandler`, `ActionControlHandler`) to pick up virtual key presses, `KeyboardEventPlugin` must also be registered — it translates DOM key events into the `heldKeys[]` Redux state those modules read. Register it alongside this plugin:

```tsx
plugins: [
    new KeyboardEventHandler({ dispatch }), // required for direction/action modules
    new VirtualKeyboardHandler(),
];
```

## Installation

1. `VirtualKeyboardHandler` has no Redux state — no reducer to add.

2. Add it to the `plugins` array:

```tsx
import { VirtualKeyboardHandler } from "game-engine/extensions/plugins/virtualKeyboardPlugin";

GameLoop.getInstance({
    plugins: [
        new KeyboardEventHandler({ dispatch }),
        new VirtualKeyboardHandler(),
        // ...
    ],
    modules: [
        /* ... */
    ],
});
```

3. Retrieve the handler instance and pass it to your UI:

```tsx
import {
    VIRTUAL_KEYBOARD_PLUGIN_ID,
    VirtualKeyboardHandler,
    VirtualKeyboardButton,
} from "game-engine/extensions/plugins/virtualKeyboardPlugin";

// In a React component that has access to gameLoop:
const handler = gameLoop.plugins[VIRTUAL_KEYBOARD_PLUGIN_ID] as VirtualKeyboardHandler;

// In JSX — style the button however you like; the engine has no visual opinions:
<VirtualKeyboardButton keyCode="ArrowLeft" handler={handler} style={myStyle}>
    ←
</VirtualKeyboardButton>;
```

## Optional config hooks

```ts
new VirtualKeyboardHandler({
    onKeyDown: (key) => console.log("pressed", key), // called after DOM event
    onKeyUp: (key) => console.log("released", key),
});
```

Use these for analytics, extra state tracking, or any custom logic — without subclassing.
