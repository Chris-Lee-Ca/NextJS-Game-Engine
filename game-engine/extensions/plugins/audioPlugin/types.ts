export type OscillatorType = "sine" | "square" | "sawtooth" | "triangle";

export interface SfxConfig {
    type: OscillatorType;
    frequency: number;
    duration: number;
    volume: number;
    /** Optional frequency to sweep to over the duration (creates a pitch bend) */
    endFrequency?: number;
    /**
     * How this SFX interacts with BGM.
     * - "layer" (default): BGM keeps playing, SFX plays on top.
     * - "block": BGM silences while this SFX plays, then resumes automatically.
     */
    bgmBehavior?: "layer" | "block";
}

export type BgmConfig =
    /** Play an audio file (mp3, ogg, wav, etc.) via HTMLAudioElement */
    | { type: "file"; src: string; volume?: number; loop?: boolean }
    /** Synthesized ambient drone using Web Audio API oscillators */
    | { type: "synth"; frequencies: number[]; volume?: number };
