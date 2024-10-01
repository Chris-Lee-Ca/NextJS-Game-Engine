# LevelPlugin

Level Plugin manages all level related information.

## Installation

1. Add LevelHandler to the GameLoop.getInstance plugins section

```jsx
GameLoop.getInstance({
    targetFPS: GAME_SETTING.TARGET_FPS,
    reduxStore: appStore,
    plugins: [
        new LevelHandler({
            store: appStore,
            dispatch,
            gameObjectFactory: new CustomGameObjectFactory(),
            currentLevel: levelState.currentLevel ? levelState.currentLevel : "default_level",
            allLevelInfo:
                Object.keys(levelState.allLevelInfo).length !== 0 ? levelState.allLevelInfo : allDemoLevelInfo,
        }),
        // ... other plugins
    ],
    modules: [
        // ... other modules
    ],
});
```

2. Add levelReducer in your configureStore

```ts
const makeStore = () => {
    return configureStore({
        reducer: {
            [LEVEL_PLUGIN_ID]: levelReducer,
        },
    });
};
```
