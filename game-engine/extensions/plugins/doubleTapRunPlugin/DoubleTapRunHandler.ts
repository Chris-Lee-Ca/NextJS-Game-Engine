import PluginHandler from "../PluginHandler";
import { DOUBLE_TAP_RUN_PLUGIN_ID, DEFAULT_DIRECTION_KEYS, MOBILE_GRACE_PERIOD_MS } from "./constants";
import { DoubleTapState } from "./types";
import { createInitialState, onKeyDown, onKeyUp } from "./doubleTapLogic";
import { setIsRunning } from "./runSlice";

export interface DoubleTapRunHandlerConfig {
    dispatch: (action: ReturnType<typeof setIsRunning>) => void;
    directionKeys?: Set<string>;
    // Returns true when input should be ignored (e.g. a modal or dialog is open).
    getIsBlocked?: () => boolean;
    // How long to keep run active after all direction keys are released (mobile finger-swap buffer).
    gracePeriodMs?: number;
}

export class DoubleTapRunHandler implements PluginHandler {
    public pluginId: string = DOUBLE_TAP_RUN_PLUGIN_ID;

    private dispatch: (action: ReturnType<typeof setIsRunning>) => void;
    private directionKeys: Set<string>;
    private getIsBlocked: () => boolean;
    private gracePeriodMs: number;

    private doubleTapState: DoubleTapState;
    // Tracks which direction keys are currently held so run is not cancelled during a finger-swap.
    private heldDirectionKeys: Set<string> = new Set();
    // Pending timer to cancel run after all keys are released; cleared if a key is pressed again within gracePeriodMs.
    private cancelRunTimer: ReturnType<typeof setTimeout> | null = null;

    constructor({ dispatch, directionKeys, getIsBlocked, gracePeriodMs }: DoubleTapRunHandlerConfig) {
        this.dispatch = dispatch;
        this.directionKeys = directionKeys ?? DEFAULT_DIRECTION_KEYS;
        this.getIsBlocked = getIsBlocked ?? (() => false);
        this.gracePeriodMs = gracePeriodMs ?? MOBILE_GRACE_PERIOD_MS;
        this.doubleTapState = createInitialState();
    }

    public init(): void {
        if (typeof window === "undefined") return;
        window.addEventListener("keydown", this._onKeyDown);
        window.addEventListener("keyup", this._onKeyUp);
    }

    public deinit(): void {
        if (typeof window === "undefined") return;
        window.removeEventListener("keydown", this._onKeyDown);
        window.removeEventListener("keyup", this._onKeyUp);
    }

    public update(_deltaTime: number): void {}

    private _onKeyDown = (e: KeyboardEvent): void => {
        if (e.repeat) return;
        this.handleKeyDown(e.key);
    };

    private _onKeyUp = (e: KeyboardEvent): void => {
        this.handleKeyUp(e.key);
    };

    private handleKeyDown(key: string): void {
        if (!this.directionKeys.has(key)) return;

        // Cancel any pending run-cancel (handles mobile finger-swap gap)
        if (this.cancelRunTimer !== null) {
            clearTimeout(this.cancelRunTimer);
            this.cancelRunTimer = null;
        }

        this.heldDirectionKeys.add(key);

        // Don't start a new run while a modal or dialog is blocking input
        if (this.getIsBlocked()) return;

        const { nextState, triggered } = onKeyDown(this.doubleTapState, key, Date.now());
        this.doubleTapState = nextState;
        if (triggered) this.dispatch(setIsRunning(true));
    }

    private handleKeyUp(key: string): void {
        if (!this.directionKeys.has(key)) return;

        this.doubleTapState = onKeyUp(this.doubleTapState, key, Date.now());
        this.heldDirectionKeys.delete(key);

        if (this.heldDirectionKeys.size === 0) {
            // Grace period lets mobile users swap fingers without dropping run mode
            this.cancelRunTimer = setTimeout(() => {
                this.cancelRunTimer = null;
                this.dispatch(setIsRunning(false));
            }, this.gracePeriodMs);
        }
    }
}

export default DoubleTapRunHandler;
