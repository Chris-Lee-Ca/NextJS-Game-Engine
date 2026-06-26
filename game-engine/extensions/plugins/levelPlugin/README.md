# levelPlugin

Manages level data and the lifecycle of loading and changing levels: building each level's game objects from its placements, recreating map boundaries, and tracking whether a level transition is in progress.

## How it works

`LevelHandler.loadLevel()` reads the current level from Redux, clears the object pool, and creates a `GameObject` for every placement in that level (plus invisible walls around its edges). `update()` keeps the pool in sync every frame — adding/removing objects as placements change, and rebuilding the boundary if the level's dimensions change.

Changing `currentLevel` (e.g. a portal dispatching `setCurrentLevel`) also drives transitions: the slice flips `isTransitioning` to `true` on a real change, and `loadLevel()` flips it back to `false` once the new level's objects are built. The plugin only owns that signal — what (if anything) renders while it's `true` is supplied by the game, see "Level transitions" below.

## Installation

1. Add `levelReducer` to your Redux store:

```ts
import { LEVEL_PLUGIN_ID, levelReducer } from "game-engine/extensions/plugins/levelPlugin";

const makeStore = () =>
    configureStore({
        reducer: {
            [LEVEL_PLUGIN_ID]: levelReducer,
            // ...
        },
    });
```

2. Add `LevelHandler` to the `plugins` array in `GameLoop.getInstance`:

```tsx
import { LevelHandler } from "game-engine/extensions/plugins/levelPlugin";

GameLoop.getInstance({
    plugins: [
        new LevelHandler({
            store: appStore,
            dispatch,
            gameObjectFactory: new CustomGameObjectFactory(),
            currentLevel: levelState.currentLevel || "default_level",
            allLevelInfo: Object.keys(levelState.allLevelInfo).length ? levelState.allLevelInfo : allLevelInfo,
        }),
        // ...
    ],
    modules: [
        /* ... */
    ],
});
```

## Config options

| Option             | Type                                         | Default     | Description                                                          |
| ------------------- | --------------------------------------------- | ------------ | ---------------------------------------------------------------------|
| `store`             | Redux store                                   | required     | Read with `getState()` to look up the current level                  |
| `dispatch`          | Redux dispatch                                | required     | Used to dispatch level/transition state changes                      |
| `gameObjectFactory` | `GameObjectFactory`                           | required     | Builds a `GameObject` from each placement                            |
| `currentLevel`      | `string`                                      | required     | Key into `allLevelInfo` for the level to load first                  |
| `allLevelInfo`      | `AllLevelInfo`                                | required     | Every level's data, keyed by level title                             |
| `onLevelChanged`    | `(newLevelInfo, previousLevelInfo) => void`   | `undefined`  | Generic hook fired whenever a level finishes loading                 |
| `transition`        | `LevelTransitionComponent`                    | `undefined`  | Renders while `isTransitioning` is `true` — see "Level transitions"  |

## Level transitions

`LevelHandler` tracks an `isTransitioning` flag in Redux: `true` from the moment `currentLevel` actually changes until the new level has finished loading, `false` again right after. No manual begin/end dispatching is needed — it's automatic.

What renders during that window is entirely up to the game. Pass any component matching `LevelTransitionComponent` into `transition`, or omit it for no visual at all:

```tsx
import { FadeTransition, LevelHandler } from "game-engine/extensions/plugins/levelPlugin";

new LevelHandler({
    // ...
    transition: FadeTransition(), // or FadeTransition({ color: "#111", revealDurationMs: 400 })
});
```

Mount the host component once, reading `transition` straight off the same handler instance so there's a single source of truth for which transition is in use:

```tsx
import { LEVEL_PLUGIN_ID, LevelHandler, LevelTransitionOverlay } from "game-engine/extensions/plugins/levelPlugin";

const levelHandler = gameLoop.plugins[LEVEL_PLUGIN_ID] as LevelHandler;

<LevelTransitionOverlay transition={levelHandler.transition} />;
```

### Writing a custom transition

A transition is just a component receiving `{ isTransitioning: boolean }` — render whatever you want while it's `true`, and return `null` once you're done:

```tsx
import { LevelTransitionComponent } from "game-engine/extensions/plugins/levelPlugin";

const SlideTransition: LevelTransitionComponent = ({ isTransitioning }) => {
    // ...
};
```

`FadeTransition()` is the one built-in implementation — shipped as a factory so its color and timing can be configured without touching the plugin itself.
