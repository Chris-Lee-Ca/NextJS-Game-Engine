import { CustomPlacement } from "@/game/types/general";
import TileObject from "./TileObject";
import GameObject from "game-engine/components/GameObject";

abstract class InteractableTileObject extends TileObject {
    isUserNearSignage: boolean;

    private signageTimeout: NodeJS.Timeout | null = null;
    
    constructor(placement: CustomPlacement) {
        super(placement);
        this.isUserNearSignage = false;
    }

    performCollisionLogic(_object: GameObject): void {
        this.isUserNearSignage = true;

        // Clear any existing timeout to prevent it from resetting the flag while user is near
        if (this.signageTimeout) {
            clearTimeout(this.signageTimeout);
        }

        // Set a timeout to reset the flag after a 1 seconds delay
        this.signageTimeout = setTimeout(() => {
            this.isUserNearSignage = false;
        }, 1000);
    }
}

export default InteractableTileObject;
