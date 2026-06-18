# AudioPlugin

Manages the Web Audio API context, background music (BGM), and sound effects (SFX).

BGM is caller-supplied — pass either a file URL or synth parameters to `startBgm()`. SFX are either file-based (preloaded) or synthesized on-demand via oscillators. Volume and mute state are stored in Redux for UI controls; audio events themselves bypass Redux to avoid per-frame state changes.

The AudioContext is created on the first user interaction (click, keydown, or touchstart) to comply with browser autoplay policy. BGM fades in gradually once the context is running.

## Installation

1. Add `AudioHandler` to `GameLoop.getInstance` plugins. No reference needs to be kept — the plugin self-registers a global accessor on `init()`.

```tsx
import { AudioHandler } from "game-engine/extensions/plugins/audioPlugin";

GameLoop.getInstance({
    plugins: [
        // ... other plugins
        new AudioHandler({ store: appStore }),
    ],
});
```

2. Add `audioReducer` to your store:

```ts
import { AUDIO_PLUGIN_ID, audioReducer } from "game-engine/extensions/plugins/audioPlugin";

configureStore({
    reducer: {
        [AUDIO_PLUGIN_ID]: audioReducer,
    },
});
```

## Accessing the handler from game objects

Use the plugin-level `getAudioHandler()` to play sounds from anywhere — game objects, entities, UI callbacks — without threading the instance through constructors.

```ts
import { getAudioHandler } from "game-engine/extensions/plugins/audioPlugin";

// Synthesized one-shot (no preloading needed)
getAudioHandler()?.playSfxDirect({
    type: "square",
    frequency: 280,
    endFrequency: 90,
    duration: 0.22,
    volume: 0.45,
});
```

## Preloading file-based SFX

Use the plugin-level `preloadSfx()` to register audio files. It is safe to call at any time — including before `AudioHandler.init()` has run (e.g. inside a game object constructor). Calls made before `init()` are queued and flushed automatically.

```ts
import { preloadSfx, getAudioHandler } from "game-engine/extensions/plugins/audioPlugin";

// In a game object constructor — order-independent, no instance reference needed
preloadSfx("footstep", "/audio/footstep.mp3");

// Later, play it
getAudioHandler()?.playSfxDirect({ type: "file", id: "footstep", volume: 0.5 });
```

## BGM

```ts
const audio = getAudioHandler();

// File-based BGM
audio?.startBgm({ type: "file", src: "/audio/bgm.mp3", volume: 0.5, loop: true });

// Synthesized drone
audio?.startBgm({ type: "synth", frequencies: [130.81, 164.81, 196.0, 246.94] });

// Stop (e.g. from a module's deinit())
audio?.stopBgm();
```

## SFX — synth vs file

| Type | Config | Preload required |
|------|--------|-----------------|
| `"sine"` `"square"` `"sawtooth"` `"triangle"` | `{ type, frequency, duration, volume, endFrequency? }` | No |
| `"file"` | `{ type: "file", id, volume? }` | Yes — call `preloadSfx(id, src)` first |

`bgmBehavior` applies to both types:
- `"layer"` (default) — SFX plays over BGM
- `"block"` — BGM pauses for the SFX duration, then resumes

## Redux state

Only user-facing settings are in Redux:

```ts
{ masterVolume: number; muted: boolean; }
```

```ts
import { setMasterVolume, setMuted } from "game-engine/extensions/plugins/audioPlugin";

dispatch(setMasterVolume(0.5));
dispatch(setMuted(true));
```
