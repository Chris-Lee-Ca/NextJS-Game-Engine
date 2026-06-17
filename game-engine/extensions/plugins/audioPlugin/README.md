# AudioPlugin

Audio Plugin manages the Web Audio API context, background music (BGM), and sound effects (SFX) for the game.

BGM is caller-supplied — pass either a file URL or custom synth parameters to `startBgm()`. SFX are synthesized on-demand via oscillators. Volume and mute state are stored in Redux for UI controls; audio events themselves bypass Redux to avoid frame-rate impact.

The AudioContext is created on the first user interaction (click, keydown, or touchstart) to comply with browser autoplay policy. BGM fades in gradually once the context is running.

## Installation

1. Add `AudioHandler` to the `GameLoop.getInstance` plugins section

```tsx
import { AudioHandler } from "game-engine/extensions/plugins/audioPlugin";

const audioHandler = new AudioHandler({ store: appStore });

GameLoop.getInstance({
    targetFPS: GAME_SETTING.TARGET_FPS,
    reduxStore: appStore,
    plugins: [
        // ... other plugins
        audioHandler,
    ],
    modules: [
        // ... other modules
    ],
});
```

2. Add `audioReducer` in your `configureStore`

```ts
import { AUDIO_PLUGIN_ID, audioReducer } from "game-engine/extensions/plugins/audioPlugin";

const makeStore = () => {
    return configureStore({
        reducer: {
            [AUDIO_PLUGIN_ID]: audioReducer,
        },
    });
};
```

## Usage

Call methods directly on the `AudioHandler` instance to control audio. Do **not** route SFX or BGM through Redux — doing so causes Redux state changes every frame and degrades performance.

```ts
// File-based BGM (mp3, ogg, wav …)
audioHandler.startBgm({ type: "file", src: "/audio/bgm.mp3", volume: 0.5, loop: true });

// Synthesized drone with custom frequencies and volume
audioHandler.startBgm({ type: "synth", frequencies: [110, 146.83, 174.61], volume: 0.06 });

// Synthesized drone — built-in C3·E3·G3·B3 chord with 3-second fade-in
audioHandler.startBgm({ type: "synth", frequencies: [130.81, 164.81, 196.0, 246.94] });

// Stop BGM (call from a module's deinit())
audioHandler.stopBgm();

// Play a one-shot sound effect — BGM keeps playing underneath (default)
audioHandler.playSfxDirect({
    type: "sine",          // "sine" | "square" | "sawtooth" | "triangle"
    frequency: 300,        // Hz
    endFrequency: 600,     // optional: sweep to this frequency over duration
    duration: 0.4,         // seconds
    volume: 0.3,           // 0–1 (relative to masterVolume)
    bgmBehavior: "layer",  // "layer" (default) | "block"
});

// Play a sound effect that silences BGM for its duration, then resumes it
audioHandler.playSfxDirect({
    type: "sine",
    frequency: 300,
    endFrequency: 600,
    duration: 0.4,
    volume: 0.3,
    bgmBehavior: "block",
});
```

## Redux State

The Redux slice only stores user-facing settings:

```ts
{
    masterVolume: number;  // 0–1, default 0.7
    muted: boolean;        // default false
}
```

Dispatch `setMasterVolume(value)` or `setMuted(true/false)` from UI components to control global volume.

```ts
import { setMasterVolume, setMuted } from "game-engine/extensions/plugins/audioPlugin";

dispatch(setMasterVolume(0.5));
dispatch(setMuted(true));
```
