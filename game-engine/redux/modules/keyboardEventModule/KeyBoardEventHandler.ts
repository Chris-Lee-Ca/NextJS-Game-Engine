import { AppDispatch } from "../../store";
import { setHeldKeys } from "./keyboardEventSlice";
import { KEY_MAPPING } from "./constants";
import { ModuleHandler } from "..";

export interface KeyboardEventHandlerConfig {
    dispatch: AppDispatch;
}
export class KeyboardEventHandler extends ModuleHandler {
    private dispatch: AppDispatch;

    private heldKeys: string[] = [];

    public constructor({ dispatch }: KeyboardEventHandlerConfig) {
        super();
        this.dispatch = dispatch;
    }

    public init(): void {
        if (typeof window !== "undefined") {
            window.addEventListener("keyup", this.handleKeyUp.bind(this));
            window.addEventListener("keydown", this.handleKeyDown.bind(this));
        }
    }

    public deinit(): void {
        if (typeof window !== "undefined") {
            window.removeEventListener("keyup", this.handleKeyUp.bind(this));
            window.removeEventListener("keydown", this.handleKeyDown.bind(this));
        }
    }

    public update(deltaTime: number): void {}

    private handleKeyUp(event: KeyboardEvent): void {
        const key = event.key in KEY_MAPPING ? KEY_MAPPING[event.key] : event.key;

        this.heldKeys = this.heldKeys.filter((heldkey) => heldkey !== key);
        this.dispatch(setHeldKeys(this.heldKeys));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const key = event.key in KEY_MAPPING ? KEY_MAPPING[event.key] : event.key;
        if (!this.heldKeys.includes(key)) {
            this.heldKeys.unshift(key);
        }
        this.dispatch(setHeldKeys(this.heldKeys));
    }
}