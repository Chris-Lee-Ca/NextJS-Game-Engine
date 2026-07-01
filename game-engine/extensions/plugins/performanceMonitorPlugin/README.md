# performanceMonitorPlugin

A lightweight engine plugin that displays a real-time FPS overlay and lets developers toggle it on/off with a keyboard shortcut.

## What it shows

- **FPS** — rolling average over the last 60 logical frames, updated ~4 times per second to stay readable.

## Setup

### 1. Register the reducer

```ts
// demo-game/src/game/redux/store.ts
import { PERFORMANCE_MONITOR_PLUGIN_ID, performanceMonitorReducer } from "game-engine/extensions/plugins/performanceMonitorPlugin";

const rootReducer = combineReducers({
    ...gameEngineReducer,
    [PERFORMANCE_MONITOR_PLUGIN_ID]: performanceMonitorReducer,
    // ...other reducers
});
```

### 2. Add the plugin to GameLoop

```ts
// GameInitializer.tsx
import { PerformanceMonitorHandler } from "game-engine/extensions/plugins/performanceMonitorPlugin";

GameLoop.getInstance({
    plugins: [
        // ...other plugins
        new PerformanceMonitorHandler({ dispatch }),
    ],
});
```

### 3. Render the overlay

```tsx
import { PerformanceOverlay } from "game-engine/extensions/plugins/performanceMonitorPlugin";

// Somewhere above the game viewport (e.g. GameBody.tsx):
<PerformanceOverlay />
```

## Config

```ts
new PerformanceMonitorHandler({
    dispatch,
    toggleKey: "`", // optional — key that shows/hides the overlay. Default: backtick
})
```

| Option      | Type     | Default    | Description                        |
|-------------|----------|------------|------------------------------------|
| `dispatch`  | `AppDispatch` | required | Redux dispatch from the game store |
| `toggleKey` | `string` | `` "`" ``  | Key that toggles overlay visibility |

## Customising the overlay position/style

`PerformanceOverlay` accepts an optional `style` prop that is merged on top of the defaults. Any property you pass overrides the default value.

```tsx
// Top-right (default)
<PerformanceOverlay />

// Bottom-right
<PerformanceOverlay style={{ top: "auto", bottom: "8px" }} />

// Bottom-left
<PerformanceOverlay style={{ top: "auto", right: "auto", bottom: "8px", left: "8px" }} />
```

Default styles: `position: fixed`, `zIndex: 150`, `pointerEvents: none`, dark semi-transparent background, green monospace text.

## Toggle

Press the configured key (default: `` ` `` backtick) at any time to show or hide the overlay. The overlay starts **visible** by default.
