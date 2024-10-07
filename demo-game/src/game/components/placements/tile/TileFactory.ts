import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import Shrub from "./shrub";
import { CreateCustomObjectParams } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";
import PreviewObject from "./previewObject";
import Flowers from "./flowers";
import Signage from "./signage";
import Signage2 from "./signage2";

class TileFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        switch (params.placement.itemName) {
            case "flowers":
                return new Flowers(params.placement);
            case "shrub":
                return new Shrub(params.placement);
            case "preview object":
                return new PreviewObject(params.placement);
            case "signage":
                return new Signage(params.placement);
            case "signage2":
                return new Signage2(params.placement);
            default:
                const placementItemName = params.placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default TileFactory;
