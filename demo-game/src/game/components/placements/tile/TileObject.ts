import { ReactNode } from "react";
import Rectangle from "game-engine/components/Rectangle";
import { CustomPlacement } from "@/game/types/general";
import GridHelper from "game-engine/helper/GridHelper";
import GameObject from "game-engine/components/GameObject";

abstract class TileObject extends GameObject {
    bound: Rectangle;
    constructor(placement: CustomPlacement) {
        super(placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }
}

export default TileObject;
