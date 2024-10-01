# MainCharacterControlModule

Main Character Control Module manages all interactions related to the main character.

<!-- TODO -->
<!-- This module encompasses both direction and action controls. -->

It relies on information provided by the `KeyboardEventModule`.
Please ensure that the `KeyboardEventModule` is activated for this module to function correctly.

## Installation

1. Add KeyboardEventHandler to the GameLoop.getInstance plugins section

```jsx
GameLoop.getInstance({
    targetFPS: GAME_SETTING.TARGET_FPS,
    reduxStore: appStore,
    plugins: [
        new KeyboardEventHandler({ dispatch }),
        // ... other plugins
    ],
    modules: [
        // ... other modules
    ],
});
```

2. Add DirectionControlHandler to the GameLoop.getInstance modules section

```jsx
GameLoop.getInstance({
    targetFPS: GAME_SETTING.TARGET_FPS,
    reduxStore: appStore,
    plugins: [
        // ... other plugins
    ],
    modules: [
        new DirectionControlHandler({ store: appStore, dispatch }),
        // ... other modules
    ],
});
```

3. Add keyboardEventReducer & mainCharacterReducer in your configureStore

```ts
const makeStore = () => {
    return configureStore({
        reducer: {
            [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
            [MAIN_CHARACTER_CONTROL_MODULE_ID]: mainCharacterReducer,
        },
    });
};
```
