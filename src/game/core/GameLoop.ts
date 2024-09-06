"use client";

import { AppStore } from "../redux/store";
import { KeyboardEventHandler } from "../redux/features/modules/keyboardEventModule";
import { DirectionControlHandler } from "../redux/features/modules/MainCharacterControlModule";
import { GAME_SETTING } from "../lib/conts";

class GameLoop {
    static instance: GameLoop;
    store: AppStore | undefined;
    lastFrameTime: number;
    keyboardEventHandler: KeyboardEventHandler;
    mainCharacterDirectionControlHandler: DirectionControlHandler;
    targetFPS: number = GAME_SETTING.TARGET_FPS;

    private constructor() {
        this.lastFrameTime = 0;
        this.keyboardEventHandler = KeyboardEventHandler.getInstance();
        this.mainCharacterDirectionControlHandler = DirectionControlHandler.getInstance();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new GameLoop();
        }
        return this.instance;
    }

    public init(store: AppStore) {
        this.store = store;
        this.keyboardEventHandler.init({ dispatch: store.dispatch });
        this.mainCharacterDirectionControlHandler.init({ store: store, dispatch: store.dispatch });
    }

    public start() {
        if (typeof this.store === "undefined") {
            throw new Error('Please call "init" method for GameLoop');
        }
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
        const objectPool = state.level.objectPool;

        this.mainCharacterDirectionControlHandler.update(deltaTime);
        for (const [objectKey, object] of Object.entries(objectPool)) {
            object.update(deltaTime);
        }
    }

    stop() {
        this.keyboardEventHandler.deinit();
    }
}
export default GameLoop;
