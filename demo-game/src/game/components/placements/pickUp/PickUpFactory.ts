import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import GameObject from "game-engine/components/GameObject";
import { CreateCustomObjectParams } from "@/game/types/general";
import Resume from "./resume";

class PickUpFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        switch (params.placement.itemName) {
            case "resume":
                return new Resume(params);
            default:
                const placementItemName = params.placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default PickUpFactory;
