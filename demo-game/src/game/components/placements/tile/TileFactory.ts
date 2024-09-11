import { GameObject, GameObjectFactory } from "game-engine/objectPool";
import Shrub from "./shrub";
import { CreateCustomObjectParams } from "@/game/types/general";

class TileFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        switch (params.placement.itemName) {
            case "shrub":
                return new Shrub(params.placement);
            default:
                const placementItemName = params.placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default TileFactory;
