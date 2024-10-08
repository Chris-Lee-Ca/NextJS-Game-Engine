# MainCharacterDirectionControlModule

Main Character Direction Control Module manages direction related interaction to the main character.

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
        new DirectionControlHandler({
            store: appStore,
            dispatch,
            directionKeyMapping: { your_custom_DirectionKeyMapping },
        }),
        // ... other modules
    ],
});
```

3. Add keyboardEventReducer & mainCharacterDirectionReducer in your configureStore

```ts
const makeStore = () => {
    return configureStore({
        reducer: {
            [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
            [MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID]: mainCharacterDirectionReducer,
        },
    });
};
```
