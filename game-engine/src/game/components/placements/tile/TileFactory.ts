import GameObject from "@/gameEngine/ObjectPool/GameObject";
import GameObjectFactory from "@/gameEngine/ObjectPool/GameObjectFactory";
import Shrub from "./shrub";
import { CustomPlacement } from "@/game/types/general";

class TileFactory extends GameObjectFactory {
    createObject(placement: CustomPlacement): GameObject {
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