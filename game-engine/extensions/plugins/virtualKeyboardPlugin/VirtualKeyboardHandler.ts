import PluginHandler from "../PluginHandler";
import { VIRTUAL_KEYBOARD_PLUGIN_ID } from "./constants";

export interface VirtualKeyboardHandlerConfig {
    // Optional hooks called after the DOM event is dispatched.
    // Use these to inject custom logic (analytics, extra state tracking, etc.)
    // without subclassing.
    onKeyDown?: (key: string) => void;
    onKeyUp?: (key: string) => void;
}

export class VirtualKeyboardHandler implements PluginHandler {
    public pluginId: string = VIRTUAL_KEYBOARD_PLUGIN_ID;

    private config: VirtualKeyboardHandlerConfig;

    constructor(config: VirtualKeyboardHandlerConfig = {}) {
        this.config = config;
    }

    public init(): void {}
    public deinit(): void {}
    public update(_deltaTime: number): void {}

    public dispatchKeyDown(key: string): void {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
        this.config.onKeyDown?.(key);
    }

    public dispatchKeyUp(key: string): void {
        if (typeof window === "undefined") return;
        window.dispatchEvent(new KeyboardEvent("keyup", { key, bubbles: true }));
        this.config.onKeyUp?.(key);
    }
}
