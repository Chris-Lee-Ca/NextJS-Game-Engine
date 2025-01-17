import { CustomPlacement } from "@/game/types/placement";
import GameObject from "game-engine/components/GameObject";

abstract class TileObject extends GameObject {
    constructor(placement: CustomPlacement) {
        super(placement);
    }
}

export default TileObject;
