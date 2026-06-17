import { CustomPlacement } from "@/game/types/placement";
import TileObject from "./TileObject";
import GameObject from "game-engine/components/GameObject";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";

abstract class InteractableTileObject extends TileObject {
    isUserNearObject: boolean;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.isUserNearObject = false;
        const gridSize = GridHelper.getGridSizeInPixel();
        const padding = gridSize * 0.5;
        this.triggerBound = new Rectangle(
            this.position.x - padding,
            this.position.y - padding,
            gridSize + padding * 2,
            gridSize + padding * 2
        );
    }

    override onTriggerEnter(_other: GameObject): void {
        this.isUserNearObject = true;
    }

    override onTriggerExit(_other: GameObject): void {
        this.isUserNearObject = false;
    }

    performCollisionLogic(_object: GameObject): void {}
}

export default InteractableTileObject;
