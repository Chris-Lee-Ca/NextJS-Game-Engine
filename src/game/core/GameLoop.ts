import { AppStore, RootState } from "../redux/store";
import { KeyboardEventHandler } from "../redux/features/modules/keyboardEventModule";
import { DirectionControlHandler } from "../redux/features/modules/MainCharacterControlModule";

class GameLoop {
    static instance: GameLoop;
    store: AppStore | undefined;
    lastFrameTime: number;
    keyboardEventHandler: KeyboardEventHandler;
    mainCharacterDirectionControlHandler: DirectionControlHandler;
    targetFPS: number = 60;

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

            // Perform your game logic here
            this.update(deltaTime);
        }
    }

    private update(deltaTime: number) {
        // const state: RootState = this.store!.getState();
        this.mainCharacterDirectionControlHandler.update();
        // const activeDirectionKey = state.keyboardControls.activeDirectionKey;

        // console.log(state.mainCharacter.mainCharacterPosition);
        // Add more actions or game logic here as needed
    }

    stop() {
        this.keyboardEventHandler.deinit();
    }
}
export default GameLoop;
