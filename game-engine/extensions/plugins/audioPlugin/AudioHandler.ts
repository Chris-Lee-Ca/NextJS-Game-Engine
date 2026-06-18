import PluginHandler from "../PluginHandler";
import { AUDIO_PLUGIN_ID } from "./constants";
import { AppStore, AudioState } from "./audioSlice";
import { BgmConfig, FileSfxConfig, SfxConfig, SynthSfxConfig } from "./types";

export interface AudioHandlerConfig {
    store: AppStore;
}

const BGM_FADE_IN_SECONDS = 3;

export class AudioHandler implements PluginHandler {
    public pluginId: string = AUDIO_PLUGIN_ID;

    private store: AppStore;

    private audioContext: AudioContext | null = null;
    /** Controls overall output volume and mute. */
    private masterGain: GainNode | null = null;
    /** Sits between BGM sources and masterGain — zeroed during "block" SFX, leaving SFX unaffected. */
    private bgmGain: GainNode | null = null;

    private bgmConfig: BgmConfig | null = null;
    private bgmOscillators: OscillatorNode[] = [];
    private bgmLFOs: OscillatorNode[] = [];
    private bgmElement: HTMLAudioElement | null = null;
    private bgmStarted: boolean = false;
    private shouldPlayBgm: boolean = false;

    /** Counts how many "block" SFX are currently playing. BGM only resumes when this reaches 0. */
    private bgmBlockCount: number = 0;

    /** src paths waiting for AudioContext to be ready before decoding. */
    private sfxPending: Map<string, string> = new Map();
    /** Decoded AudioBuffers keyed by the id passed to preloadSfx(). */
    private sfxBuffers: Map<string, AudioBuffer> = new Map();

    public constructor({ store }: AudioHandlerConfig) {
        this.store = store;
    }

    public init(): void {
        if (typeof window === "undefined") return;
        // These listeners only create the AudioContext (browser autoplay policy).
        // BGM is started separately via update() once the context is running.
        window.addEventListener("click", this.resumeContext, { once: true });
        window.addEventListener("keydown", this.resumeContext, { once: true });
        window.addEventListener("touchstart", this.resumeContext, { once: true });
    }

    public deinit(): void {
        if (typeof window === "undefined") return;
        window.removeEventListener("click", this.resumeContext);
        window.removeEventListener("keydown", this.resumeContext);
        window.removeEventListener("touchstart", this.resumeContext);
        this.stopBgm();
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
            this.masterGain = null;
            this.bgmGain = null;
        }
        this.sfxBuffers.clear();
        this.sfxPending.clear();
    }

    public update(_deltaTime: number): void {
        if (!this.audioContext || !this.masterGain) return;

        const state = this.store.getState()[AUDIO_PLUGIN_ID] as AudioState;
        const effectiveVolume = state.muted ? 0 : state.masterVolume;
        this.masterGain.gain.setTargetAtTime(effectiveVolume, this.audioContext.currentTime, 0.05);

        // Auto-start BGM once AudioContext is running — never from within the event listener,
        // so arbitrary key presses don't feel like they trigger a sound effect.
        if (this.shouldPlayBgm && !this.bgmStarted && this.audioContext.state === "running") {
            this._doStartBgm();
        }
    }

    /**
     * Preload an audio file so it can be played instantly with playSfxDirect({ type: "file", id }).
     * Safe to call before the AudioContext exists — decoding happens automatically after first
     * user interaction.
     */
    public preloadSfx(id: string, src: string): void {
        if (this.audioContext && this.audioContext.state === "running") {
            this._decodeAndCache(id, src);
        } else {
            this.sfxPending.set(id, src);
        }
    }

    public playSfxDirect(config: SfxConfig): void {
        if (!this.audioContext || !this.masterGain) return;
        if (config.type === "file") {
            this._playFileSfx(config);
        } else {
            this._playSynthSfx(config);
        }
    }

    public startBgm(config: BgmConfig): void {
        this.bgmConfig = config;
        this.shouldPlayBgm = true;
        // Actual start happens in update() once AudioContext is confirmed running.
    }

    public stopBgm(): void {
        this.shouldPlayBgm = false;
        this.bgmStarted = false;
        this.bgmBlockCount = 0;
        this._stopSynthBgm();
        this._stopFileBgm();
    }

    // ── private ─────────────────────────────────────────────────────────────

    private resumeContext = (): void => {
        if (!this.audioContext) {
            this.audioContext = new AudioContext();
            this.bgmGain = this.audioContext.createGain();
            this.masterGain = this.audioContext.createGain();
            this.bgmGain.connect(this.masterGain);
            this.masterGain.connect(this.audioContext.destination);
            const state = this.store.getState()[AUDIO_PLUGIN_ID] as AudioState;
            this.masterGain.gain.value = state.muted ? 0 : state.masterVolume;
        }
        if (this.audioContext.state === "suspended") {
            this.audioContext.resume();
        }
        // Decode any SFX files that were registered before the context existed.
        this.sfxPending.forEach((src, id) => this._decodeAndCache(id, src));
        this.sfxPending.clear();
        // BGM NOT started here — update() handles it on the next frame.
    };

    private _playFileSfx(config: FileSfxConfig): void {
        const buffer = this.sfxBuffers.get(config.id);
        if (!buffer || !this.audioContext || !this.masterGain) return;

        const source = this.audioContext.createBufferSource();
        const gain = this.audioContext.createGain();
        source.buffer = buffer;
        gain.gain.value = config.volume ?? 1.0;
        source.connect(gain);
        gain.connect(this.masterGain);
        source.start();

        if (config.bgmBehavior === "block") {
            this._blockBgm();
            source.onended = () => {
                this._unblockBgm();
                gain.disconnect();
            };
        } else {
            source.onended = () => { gain.disconnect(); };
        }
    }

    private _playSynthSfx(config: SynthSfxConfig): void {
        if (!this.audioContext || !this.masterGain) return;

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = config.type;
        osc.frequency.setValueAtTime(config.frequency, now);
        if (config.endFrequency !== undefined) {
            osc.frequency.linearRampToValueAtTime(config.endFrequency, now + config.duration);
        }

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(config.volume, now + 0.005);
        gain.gain.setValueAtTime(config.volume, now + config.duration - 0.01);
        gain.gain.linearRampToValueAtTime(0, now + config.duration);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + config.duration);

        if (config.bgmBehavior === "block") {
            this._blockBgm();
            osc.onended = () => {
                this._unblockBgm();
                gain.disconnect();
                osc.disconnect();
            };
        } else {
            osc.onended = () => {
                gain.disconnect();
                osc.disconnect();
            };
        }
    }

    private _blockBgm(): void {
        this.bgmBlockCount++;
        if (this.bgmBlockCount > 1) return;

        if (this.bgmConfig?.type === "file" && this.bgmElement) {
            this.bgmElement.pause();
        } else if (this.bgmGain && this.audioContext) {
            this.bgmGain.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.02);
        }
    }

    private _unblockBgm(): void {
        this.bgmBlockCount = Math.max(0, this.bgmBlockCount - 1);
        if (this.bgmBlockCount > 0) return;

        if (this.bgmConfig?.type === "file" && this.bgmElement) {
            this.bgmElement.play().catch(() => {});
        } else if (this.bgmGain && this.audioContext) {
            this.bgmGain.gain.setTargetAtTime(1, this.audioContext.currentTime, 0.05);
        }
    }

    private _doStartBgm(): void {
        if (!this.bgmConfig) return;
        this.bgmStarted = true;
        if (this.bgmConfig.type === "file") {
            this._startFileBgm(this.bgmConfig);
        } else {
            this._startSynthBgm(this.bgmConfig);
        }
    }

    private _startFileBgm(config: Extract<BgmConfig, { type: "file" }>): void {
        this._stopFileBgm();
        const el = new Audio(config.src);
        el.loop = config.loop ?? true;
        el.volume = config.volume ?? 0.5;
        el.play().catch(() => {});
        this.bgmElement = el;
    }

    private _stopFileBgm(): void {
        if (this.bgmElement) {
            this.bgmElement.pause();
            this.bgmElement.src = "";
            this.bgmElement = null;
        }
    }

    private _startSynthBgm(config: Extract<BgmConfig, { type: "synth" }>): void {
        if (!this.audioContext || !this.bgmGain) return;
        this._stopSynthBgm();

        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const targetGain = config.volume ?? 0.04;
        const waveType = config.waveType ?? "sine";
        const lfoRate = config.lfoRate ?? 0.3;
        const lfoDepth = config.lfoDepth ?? 3;

        this.bgmGain.gain.setValueAtTime(this.bgmBlockCount > 0 ? 0 : 1, now);

        config.frequencies.forEach((freq: number, i: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();

            osc.type = waveType;
            osc.frequency.value = freq;
            osc.detune.value = i % 2 === 0 ? -5 : 5;

            lfo.type = "sine";
            lfo.frequency.value = lfoRate;
            lfoGain.gain.value = lfoDepth;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.detune);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(targetGain, now + BGM_FADE_IN_SECONDS);

            osc.connect(gain);
            gain.connect(this.bgmGain!);

            lfo.start();
            osc.start();

            this.bgmOscillators.push(osc);
            this.bgmLFOs.push(lfo);
        });
    }

    private _stopSynthBgm(): void {
        this.bgmLFOs.forEach((lfo) => {
            try { lfo.stop(); } catch (_) {}
            lfo.disconnect();
        });
        this.bgmOscillators.forEach((osc) => {
            try { osc.stop(); } catch (_) {}
            osc.disconnect();
        });
        this.bgmLFOs = [];
        this.bgmOscillators = [];
    }

    private async _decodeAndCache(id: string, src: string): Promise<void> {
        if (!this.audioContext) return;
        try {
            const response = await fetch(src);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.sfxBuffers.set(id, audioBuffer);
        } catch (_) {
            // File missing or decode error — fail silently
        }
    }
}
