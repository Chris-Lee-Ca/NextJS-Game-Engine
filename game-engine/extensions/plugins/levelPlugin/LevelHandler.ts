import { AppDispatch, AppStore, setAllLevelInfo, setCurrentLevel } from "./levelSlice";
import { AllLevelInfo, LevelInfo } from "./types";
import { CreateObjectParams, GameObjectFactory } from "../../../components/GameObjectFactory";
import GameObject from "../../../components/GameObject";
import ObjectPool from "../../../core/ObjectPool";
import { Coordinate, Placement } from "../../../types/general";
import InvisibleWall from "../../../components/InvisibleWall";
import PluginHandler from "../PluginHandler";
import { LEVEL_PLUGIN_ID } from ".";
import { setObjectIdPool } from "../../../redux/features/coreSlice";

export interface LevelHandlerConfig {
    store: AppStore;
    dispatch: AppDispatch;
    gameObjectFactory: GameObjectFactory;
    currentLevel: string;
    allLevelInfo: AllLevelInfo;
}

export class LevelHandler implements PluginHandler {
    public pluginId: string;
    private store: AppStore;
    private dispatch: AppDispatch;
    private objectPool: Map<string, GameObject>;
    private gameObjectFactory: GameObjectFactory<unknown>;

    public constructor({ store, dispatch, gameObjectFactory, currentLevel, allLevelInfo }: LevelHandlerConfig) {
        this.pluginId = LEVEL_PLUGIN_ID;
        this.store = store;
        this.dispatch = dispatch;
        this.gameObjectFactory = gameObjectFactory;
        this.objectPool = ObjectPool;
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
        //reset object pool
        this.objectPool.clear();

        const state = this.store.getState();
        const levelState = state[LEVEL_PLUGIN_ID];
        const currentLevelInfo = levelState.allLevelInfo[levelState.currentLevel];
        this.createMapBoundry(currentLevelInfo);

        const currentLevelPlacements = currentLevelInfo.placements;
        const newObjectIdPool = currentLevelPlacements.map((placement) => placement.id);
        this.dispatch(setObjectIdPool(newObjectIdPool));
        currentLevelPlacements.forEach((placement) => {
            const params: CreateObjectParams<AppStore> = {
                placement,
                reduxStore: this.store,
            };
            const gameObject = this.gameObjectFactory.createObject(params);
            this.objectPool.set(placement.id, gameObject);
        });
    }

    public deinit(): void {}

    public update(deltaTime: number): void {}

    private createMapBoundry(currentLevelInfo: LevelInfo): void {
        for (let x = 0; x < currentLevelInfo.tilesWidth; x++) {
            this.createInvisibleWall({ x, y: -1 });
            this.createInvisibleWall({ x, y: currentLevelInfo.tilesHeight });
        }
        for (let y = 0; y < currentLevelInfo.tilesHeight; y++) {
            this.createInvisibleWall({ x: -1, y });
            this.createInvisibleWall({ x: currentLevelInfo.tilesWidth, y });
        }
    }

    private createInvisibleWall(coord: Coordinate): void {
        const invisibleWallPlacement: Placement = {
            id: `Other-invisible-wall-${coord.x}-${coord.y}`,
            coord: coord,
            type: "Other",
            itemName: "invisible wall",
        };
        const invisibleWallObject = new InvisibleWall({ placement: invisibleWallPlacement });
        this.objectPool.set(invisibleWallPlacement.id, invisibleWallObject);
    }
}
