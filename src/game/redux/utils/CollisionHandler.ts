import { Level, Position } from "@/game/types/general";
import { RootState } from "../store";
import { UseSelector } from "react-redux";

type Rectangle = {
    x: number; // Top-left corner x-coordinate
    y: number; // Top-left corner y-coordinate
    width: number; // Width of the rectangle
    height: number; // Height of the rectangle
};

class CollisionHandler {
    private static instance: CollisionHandler;
    private levelInformation: Level;
    private appSelector: UseSelector<RootState> | undefined;

    private constructor(levelInformation: Level) {
        this.levelInformation = levelInformation;
    }

    public init(appSelector: UseSelector<RootState>) {
        this.appSelector = appSelector;
    }

    public static getInstance(levelInformation: Level) {
        if (!this.instance) {
            this.instance = new CollisionHandler(levelInformation);
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
