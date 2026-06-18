import { CustomPlacement } from "@/game/types/placement";
import TileObject from "./TileObject";
import GameObject from "game-engine/components/GameObject";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import CharacterObject from "../character/CharacterObject";

abstract class InteractableTileObject extends TileObject {
    isUserNearObject: boolean;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.isUserNearObject = false;
        const gridSize = GridHelper.getGridSizeInPixel();
        const padding = gridSize * 0.3;
        this.triggerBound = new Rectangle(
            this.position.x - padding,
            this.position.y - padding,
            gridSize + padding * 2,
            gridSize + padding * 2,
        );
    }

    override onTriggerEnter(other: GameObject): void {
        if (other instanceof CharacterObject) {
            this.isUserNearObject = true;
        }
    }

    override onTriggerExit(other: GameObject): void {
        if (other instanceof CharacterObject) {
            this.isUserNearObject = false;
        }
    }

    performCollisionLogic(_object: GameObject): void {}
}

export default InteractableTileObject;
