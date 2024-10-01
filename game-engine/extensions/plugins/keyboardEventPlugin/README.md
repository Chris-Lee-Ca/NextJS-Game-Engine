# KeyBoardEventPlugin

keyboard Event Plugin handle all keyboard event.

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

2. Add keyboardEventReducer in your configureStore

```ts
const makeStore = () => {
    return configureStore({
        reducer: {
            [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
        },
    });
};
```
