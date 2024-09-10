import { ModuleHandler } from "../redux/modules";
import { AppStore } from "../redux/store";

import { objectPool } from "../objectPool";

interface GameLoopConfig {
    targetFPS: number;
    reduxStore: AppStore;
    modules: ModuleHandler[];
}

class GameLoop {
    static instance: GameLoop;
    store: AppStore;
    lastFrameTime: number;
    targetFPS: number;
    modules: ModuleHandler[];

    private constructor({ targetFPS, reduxStore, modules }: GameLoopConfig) {
        this.lastFrameTime = 0;
        this.targetFPS = targetFPS;
        this.store = reduxStore;
        this.modules = modules;
        // init modules
        this.modules.forEach((module) => {
            module.init();
        });
    }

    public static getInstance(gameLoopConfig: GameLoopConfig) {
        if (!this.instance) {
            this.instance = new GameLoop(gameLoopConfig);
        }
        return this.instance;
    }

    public start() {
        this.loop(0); // Start the loop
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
        const state = this.store!.getState();
        const objectIdPool = state.level.objectIdPool;
        // update modules
        this.modules.forEach((module) => {
            module.update(deltaTime);
        });

        objectIdPool.forEach((objectId) => {
            const object = objectPool.get(objectId);
            object?.update(deltaTime);
        });
    }

    stop() {
        // deinit modules
        this.modules.forEach((module) => {
            module.deinit();
        });
    }
}
export default GameLoop;
