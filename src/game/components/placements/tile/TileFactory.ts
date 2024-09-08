import { Placement } from "@/game/types/general";
import GameObject from "../../../core/ObjectPool/GameObject";
import GameObjectFactory from "../../../core/ObjectPool/GameObjectFactory";
import Shrub from "./shrub";

class TileFactory extends GameObjectFactory {
    createObject(placement: Placement): GameObject {
        switch (placement.itemName) {
            case "shrub":
                return new Shrub(placement);
            default:
                const placementItemName = placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default TileFactory;
