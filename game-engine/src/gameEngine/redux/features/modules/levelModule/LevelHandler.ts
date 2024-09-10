import { AppDispatch, AppStore } from "@/gameEngine/redux/store";
import { ModuleHandler } from "..";
import { setAllLevelInfo, setCurrentLevel, setObjectPool } from "./levelSlice";
import objectPool from "@/gameEngine/ObjectPool";
import GameObject from "@/gameEngine/ObjectPool/GameObject";
import GameObjectFactory from "@/gameEngine/ObjectPool/GameObjectFactory";
import { AllLevelInfo } from "./types";

export interface LevelHandlerConfig {
    store: AppStore;
    dispatch: AppDispatch;
    gameObjectFactory: GameObjectFactory;
    currentLevel: string;
    allLevelInfo: AllLevelInfo;
}

export class LevelHandler extends ModuleHandler {
    private store: AppStore;
    private dispatch: AppDispatch;
    private objectPool: Map<string, GameObject>;
    private gameObjectFactory: GameObjectFactory;

    public constructor({ store, dispatch, gameObjectFactory, currentLevel, allLevelInfo }: LevelHandlerConfig) {
        super();
        this.store = store;
        this.dispatch = dispatch;
        this.gameObjectFactory = gameObjectFactory;
        this.objectPool = objectPool;
        this.dispatch(setCurrentLevel(currentLevel));
        this.dispatch(setAllLevelInfo(allLevelInfo));
    }

    public init(): void {
        this.loadLevel();
    }

    public loadLevel(): void {
        if (typeof this.store === "undefined" || typeof this.dispatch === "undefined") {
            throw new Error('Please call "init" method for LevelHandler');
        }
        const state = this.store.getState();
        const levelState = state.level;
        const currentLevelInfo = levelState.allLevelInfo[levelState.currentLevel];
        const currentLevelPlacements = currentLevelInfo.placements;
        this.dispatch(setObjectPool(currentLevelPlacements.map((placement) => placement.id)));
        currentLevelPlacements.forEach((placement) => {
            const gameObject = this.gameObjectFactory.createObject(placement);
            this.objectPool.set(placement.id, gameObject);
        });
    }

    public deinit(): void {}

    public update(deltaTime: number): void {}
}
