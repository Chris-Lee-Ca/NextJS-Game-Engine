import { ReactNode } from "react";
import { GameObject } from "game-engine/objectPool";
import Rectangle from "game-engine/components/Rectangle";
import { CustomPlacement } from "@/game/types/general";
import GridHelper from "game-engine/helper/GridHelper";
import Converter from "game-engine/helper/Converter";

abstract class TileObject extends GameObject {
    bound: Rectangle;
    constructor(placement: CustomPlacement) {
        super(placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(Converter.coordToVector(placement.position), gridSize, gridSize);
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    render(): ReactNode {
        throw new Error("Method not implemented.");
    }
}

export default TileObject;
