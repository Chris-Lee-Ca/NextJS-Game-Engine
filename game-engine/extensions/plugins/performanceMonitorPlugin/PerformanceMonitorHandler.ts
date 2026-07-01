import PluginHandler from "../PluginHandler";
import { PERFORMANCE_MONITOR_PLUGIN_ID, DEFAULT_TOGGLE_KEY } from "./constants";
import { AppDispatch, setStats, toggleVisible } from "./performanceMonitorSlice";

const BUFFER_SIZE = 60;
const DISPATCH_INTERVAL_MS = 250;

export interface PerformanceMonitorHandlerConfig {
    dispatch: AppDispatch;
    toggleKey?: string;
}

export class PerformanceMonitorHandler implements PluginHandler {
    public pluginId: string = PERFORMANCE_MONITOR_PLUGIN_ID;

    private dispatch: AppDispatch;
    private toggleKey: string;

    private deltaBuffer: number[] = [];
    private lastDispatchTime: number = 0;

    public constructor({ dispatch, toggleKey = DEFAULT_TOGGLE_KEY }: PerformanceMonitorHandlerConfig) {
        this.dispatch = dispatch;
        this.toggleKey = toggleKey;
    }

    public init(): void {
        if (typeof window !== "undefined") {
            window.addEventListener("keydown", this.handleKey);
        }
    }

    public deinit(): void {
        if (typeof window !== "undefined") {
            window.removeEventListener("keydown", this.handleKey);
        }
    }

    public update(deltaTime: number): void {
        if (deltaTime <= 0) return;

        this.deltaBuffer.push(deltaTime);
        if (this.deltaBuffer.length > BUFFER_SIZE) {
            this.deltaBuffer.shift();
        }

        const now = performance.now();
        if (now - this.lastDispatchTime < DISPATCH_INTERVAL_MS) return;
        this.lastDispatchTime = now;

        const avg = this.deltaBuffer.reduce((sum, d) => sum + d, 0) / this.deltaBuffer.length;
        this.dispatch(setStats({ fps: 1000 / avg }));
    }

    private handleKey = (e: KeyboardEvent): void => {
        if (e.repeat) return;
        if (e.key === this.toggleKey) {
            this.dispatch(toggleVisible());
        }
    };
}
