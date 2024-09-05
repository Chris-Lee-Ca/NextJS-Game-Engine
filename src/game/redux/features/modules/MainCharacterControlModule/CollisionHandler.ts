import { LevelInfo, Position } from "@/game/types/general";
import { RootState } from "../../../store";
import { UseSelector } from "react-redux";

type Rectangle = {
    x: number; // Top-left corner x-coordinate
    y: number; // Top-left corner y-coordinate
    width: number; // Width of the rectangle
    height: number; // Height of the rectangle
};

class CollisionHandler {
    private static instance: CollisionHandler;
    private levelInfo: LevelInfo;
    private appSelector: UseSelector<RootState> | undefined;

    private constructor(levelInfo: LevelInfo) {
        this.levelInfo = levelInfo;
    }

    public init(appSelector: UseSelector<RootState>) {
        this.appSelector = appSelector;
    }

    public static getInstance(levelInfo: LevelInfo) {
        if (!this.instance) {
            this.instance = new CollisionHandler(levelInfo);
        }
        return this.instance;
    }

    public isCollisionImminent(): boolean {
        return false;
    }

    // private getObjectOccupyArea(): Box {

    // }
}

export default CollisionHandler;
