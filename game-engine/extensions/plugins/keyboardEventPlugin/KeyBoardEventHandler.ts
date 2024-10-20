import { AppDispatch, setHeldKeys } from "./keyboardEventSlice";
import { KEYBOARD_EVENT_PLUGIN_ID } from "./constants";
import PluginHandler from "../PluginHandler";
import { KeyboardKey } from "./types";

export interface KeyboardEventHandlerConfig {
    dispatch: AppDispatch;
}
export class KeyboardEventHandler implements PluginHandler {
    public pluginId: string = KEYBOARD_EVENT_PLUGIN_ID;

    private dispatch: AppDispatch;

    private heldKeys: KeyboardKey[] = [];

    public constructor({ dispatch }: KeyboardEventHandlerConfig) {
        this.dispatch = dispatch;
    }

    public init(): void {
        if (typeof window !== "undefined") {
            window.addEventListener("keyup", this.handleKeyUp.bind(this));
            window.addEventListener("keydown", this.handleKeyDown.bind(this));
            window.addEventListener("focus", this.handleWindowFocus.bind(this));
        }
    }

    public deinit(): void {
        if (typeof window !== "undefined") {
            window.removeEventListener("keyup", this.handleKeyUp.bind(this));
            window.removeEventListener("keydown", this.handleKeyDown.bind(this));
            window.removeEventListener("focus", this.handleWindowFocus.bind(this));
        }
    }

    public update(deltaTime: number): void {}

    public handleKeyUp(event: KeyboardEvent): void {
        const key = event.key as KeyboardKey;
        this.heldKeys = this.heldKeys.filter((heldkey) => heldkey !== key);
        this.dispatch(setHeldKeys(this.heldKeys));
    }

    public handleKeyDown(event: KeyboardEvent): void {
        const key = event.key as KeyboardKey;
        if (!this.heldKeys.includes(key)) {
            this.heldKeys.unshift(key);
        }
        this.dispatch(setHeldKeys(this.heldKeys));
    }

    private handleWindowFocus(): void {
        // Reset heldKeys to ensure accurate state when returning to the window
        this.heldKeys = [];
        this.dispatch(setHeldKeys(this.heldKeys));
    }
}
