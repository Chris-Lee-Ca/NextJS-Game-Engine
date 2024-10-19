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

    private previousLevelInfo: LevelInfo | undefined;

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
            this.createGameObject(placement);
        });

        this.previousLevelInfo = currentLevelInfo;
    }

    public deinit(): void {}

    public update(_deltaTime: number): void {
        const levelState = this.store.getState()[LEVEL_PLUGIN_ID];
        const currentLevelInfo = levelState.allLevelInfo[levelState.currentLevel];
        const currentLevelPlacements = currentLevelInfo.placements;

        // Add objects that are in placements but not in the objectPool
        currentLevelPlacements.forEach((placement) => {
            if (!this.objectPool.has(placement.id)) {
                this.createGameObject(placement);
            }
        });

        // Update Object ID Pool
        const { objectIdPool } = this.store.getState().core;
        const newObjectIdPool = currentLevelPlacements.map((placement) => placement.id);
        if (JSON.stringify(objectIdPool) !== JSON.stringify(newObjectIdPool)) {
            this.dispatch(setObjectIdPool(newObjectIdPool));
        }

        // Remove objects that are in objectPool but not in placements
        // except it is a invisibleWall (map boundary)
        const placementIds = new Set(currentLevelPlacements.map((p) => p.id));
        this.objectPool.forEach((_, objectId) => {
            if (!placementIds.has(objectId) && !objectId.startsWith("Other-invisible-wall")) {
                this.objectPool.delete(objectId);
            }
        });

        // Re-create map boundry if the map size change
        const previousLevelInfo = this.previousLevelInfo as LevelInfo;
        if (
            previousLevelInfo.tilesHeight !== currentLevelInfo.tilesHeight ||
            previousLevelInfo.tilesWidth !== currentLevelInfo.tilesWidth
        ) {
            this.objectPool.forEach((_, objectId) => {
                if (objectId.startsWith("Other-invisible-wall")) {
                    this.objectPool.delete(objectId);
                }
            });
            this.createMapBoundry(currentLevelInfo);
        }

        this.previousLevelInfo = currentLevelInfo;
    }

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

    private createGameObject(placement: Placement) {
        const params: CreateObjectParams<AppStore> = {
            placement,
            reduxStore: this.store,
        };
        const gameObject = this.gameObjectFactory.createObject(params);
        this.objectPool.set(placement.id, gameObject);
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
