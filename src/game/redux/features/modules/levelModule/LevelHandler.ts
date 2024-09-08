import { AppDispatch, AppStore } from "@/game/redux/store";
import { Config, ModuleHandler } from "..";
import { setObjectPool } from "./levelSlice";
import objectPool from "@/game/core/ObjectPool";
import GameObject from "@/game/core/ObjectPool/GameObject";
import PlacementFactory from "@/game/components/placements/PlacementFactory";

export class LevelHandler extends ModuleHandler {
    private static instance: LevelHandler;
    private store: AppStore | undefined;
    private dispatch: AppDispatch | undefined;
    private objectPool: Map<string, GameObject>;

    private constructor() {
        super();
        this.objectPool = objectPool;
    }

    public static getInstance(): LevelHandler {
        if (!this.instance) {
            this.instance = new LevelHandler();
        }
        return this.instance;
    }

    public init({ store, dispatch }: Config): void {
        this.store = store;
        this.dispatch = dispatch;
        this.loadLevel();
    }

    public loadLevel(): void {
        if (typeof this.store === "undefined" || typeof this.dispatch === "undefined") {
            throw new Error('Please call "init" method for LevelHandler');
        }
        const state = this.store.getState();
        const gameState = state.game;
        const currentLevelInfo = gameState.allLevelInfo[gameState.currentLevel];
        const currentLevelPlacements = currentLevelInfo.placements;
        this.dispatch(setObjectPool(currentLevelPlacements.map((placement) => placement.id)));
        const placementFactory = new PlacementFactory();
        currentLevelPlacements.forEach((placement) => {
            const placementObject = placementFactory.createObject(placement);
            this.objectPool.set(placement.id, placementObject);
        });
    }

    public deinit(): void {}
}
