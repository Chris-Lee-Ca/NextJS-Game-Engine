import { AppDispatch } from "../../../store";
import { setHeldKeys } from "./keyboardEventSlice";
import { KEY_MAPPING } from "./constants";
import { Config, ModuleHandler } from "..";

export class KeyboardEventHandler extends ModuleHandler {
    private static instance: KeyboardEventHandler;
    private dispatch: AppDispatch | undefined;

    private heldKeys: string[] = [];

    private constructor() {
        super();
    }

    public static getInstance(): KeyboardEventHandler {
        if (!this.instance) {
            this.instance = new KeyboardEventHandler();
        }
        return this.instance;
    }

    public init({ dispatch }: Config): void {
        this.dispatch = dispatch;
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    public deinit(): void {
        window.removeEventListener("keyup", this.handleKeyUp.bind(this));
        window.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    public update(deltaTime: number): void {}

    private handleKeyUp(event: KeyboardEvent): void {
        if (typeof this.dispatch === "undefined") {
            throw new Error('Please call "init" method for KeyboardEventHandler');
        }

        const key = event.key in KEY_MAPPING ? KEY_MAPPING[event.key] : event.key;

        this.heldKeys = this.heldKeys.filter((heldkey) => heldkey !== key);
        this.dispatch(setHeldKeys(this.heldKeys));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (typeof this.dispatch === "undefined") {
            throw new Error('Please call "init" method for KeyboardEventHandler');
        }

        const key = event.key in KEY_MAPPING ? KEY_MAPPING[event.key] : event.key;
        if (!this.heldKeys.includes(key)) {
            this.heldKeys.unshift(key);
        }
        this.dispatch(setHeldKeys(this.heldKeys));
    }
}
