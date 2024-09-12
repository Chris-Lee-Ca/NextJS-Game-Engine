import { ReactNode } from "react";
import Rectangle from "game-engine/components/Rectangle";
import { CustomPlacement } from "@/game/types/general";
import GridHelper from "game-engine/helper/GridHelper";
import Converter from "game-engine/helper/Converter";
import GameObject from "game-engine/components/GameObject";

abstract class TileObject extends GameObject {
    bound: Rectangle;
    constructor(placement: CustomPlacement) {
        super(placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    render(): ReactNode {
        throw new Error("Method not implemented.");
    }
}

export default TileObject;
