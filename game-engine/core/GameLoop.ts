import PluginHandler from "../extensions/plugins/PluginHandler";
import ModuleHandler from "../extensions/modules/ModuleHandler";
import { updateTime } from "../redux/features/coreSlice";
import { AppStore } from "../redux/store";
import ObjectPool from "./ObjectPool";

interface GameLoopConfig {
    targetFPS: number;
    reduxStore: AppStore;
    plugins: PluginHandler[];
    modules: ModuleHandler[];
}

class GameLoop {
    static instance: GameLoop;
    store: AppStore;
    lastFrameTime: number;
    targetFPS: number;
    plugins: { [key: string]: PluginHandler };
    modules: { [key: string]: ModuleHandler };
    private triggerOverlapState: Map<string, Set<string>> = new Map();

    private constructor({ targetFPS, reduxStore, plugins, modules }: GameLoopConfig) {
        this.lastFrameTime = 0;
        this.targetFPS = targetFPS;
        this.store = reduxStore;
        this.plugins = plugins.reduce(
            (acc, plugin) => {
                acc[plugin.pluginId] = plugin;
                return acc;
            },
            {} as { [key: string]: PluginHandler },
        );
        this.modules = modules.reduce(
            (acc, module) => {
                // Validate if all modules' related plugins are installed
                if (!(module.pluginId in this.plugins)) {
                    throw new Error(
                        `Plugin ${module.pluginId} is missing, which is a prerequisite of module ${module.moduleId}`,
                    );
                }
                acc[module.moduleId] = module;
                return acc;
            },
            {} as { [key: string]: ModuleHandler },
        );
        // init plugins
        Object.entries(this.plugins).forEach(([_key, pluginHandler]) => {
            pluginHandler.init();
        });

        // init modules
        Object.entries(this.modules).forEach(([_key, moduleHandler]) => {
            moduleHandler.init();
        });
    }

    public static getInstance(gameLoopConfig: GameLoopConfig) {
        if (!this.instance) {
            this.instance = new GameLoop(gameLoopConfig);
        }
        return this.instance;
    }

    public start() {
        // Re-init plugins/modules in case a previous stop() removed their listeners.
        // addEventListener deduplicates same-reference listeners, so calling init()
        // here when already initialized (first start) is safe.
        Object.values(this.plugins).forEach((p) => p.init());
        Object.values(this.modules).forEach((m) => m.init());
        this.loop(0);
    }

    public loop(currentTime: number) {
        requestAnimationFrame(this.loop.bind(this)); // Continue the loop

        const deltaTime = currentTime - this.lastFrameTime;
        const frameDuration = 1000 / this.targetFPS;
        if (deltaTime >= frameDuration) {
            this.lastFrameTime = currentTime;

            // Perform Game Logic Here
            this.update(deltaTime);
        }
    }

    private update(deltaTime: number) {
        this.store.dispatch(updateTime());

        // update plugins
        Object.entries(this.plugins).forEach(([_key, pluginHandler]) => {
            pluginHandler.update(deltaTime);
        });

        // update modules
        Object.entries(this.modules).forEach(([_key, moduleHandler]) => {
            moduleHandler.update(deltaTime);
        });

        // update game object
        const state = this.store!.getState();
        const objectIdPool = state.core.objectIdPool;

        objectIdPool.forEach((objectId) => {
            const object = ObjectPool.get(objectId);
            object?.update(deltaTime);
        });

        // update trigger overlap state
        this.processTriggers();
    }

    // Runs every frame after all object updates.
    // For every object that defines a triggerBound, checks which other objects'
    // solid bounds overlap it, then fires onTriggerEnter / onTriggerExit for
    // objects that newly entered or left since the previous frame.
    // Unlike performCollisionLogic (which blocks movement), triggers are passive —
    // they never affect physics, only notify the owner.
    private processTriggers(): void {
        for (const [triggerId, triggerObject] of ObjectPool) {
            if (!triggerObject.triggerBound) continue;

            const previousOverlaps = this.triggerOverlapState.get(triggerId) ?? new Set<string>();
            const currentOverlaps = new Set<string>();

            // Build the set of objects currently inside this trigger zone.
            for (const [otherId, otherObject] of ObjectPool) {
                if (otherId === triggerId) continue;
                if (!otherObject.bound) continue;
                if (triggerObject.triggerBound.overlaps(otherObject.bound)) {
                    currentOverlaps.add(otherId);
                }
            }

            // Fire enter for objects that weren't inside last frame.
            for (const id of currentOverlaps) {
                if (!previousOverlaps.has(id)) {
                    const other = ObjectPool.get(id)!;
                    triggerObject.onTriggerEnter(other);
                }
            }

            // Fire exit for objects that were inside last frame but no longer are.
            for (const id of previousOverlaps) {
                if (!currentOverlaps.has(id)) {
                    const other = ObjectPool.get(id)!;
                    triggerObject.onTriggerExit(other);
                }
            }

            this.triggerOverlapState.set(triggerId, currentOverlaps);
        }
    }

    stop() {
        // deinit modules
        Object.entries(this.modules).forEach(([_key, moduleHandler]) => {
            moduleHandler.deinit();
        });
        // deinit plugins
        Object.entries(this.plugins).forEach(([_key, pluginHandler]) => {
            pluginHandler.deinit();
        });
    }
}
export default GameLoop;
