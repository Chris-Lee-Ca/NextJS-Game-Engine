import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import GameObject from "game-engine/components/GameObject";
import { CreateCustomObjectParams, PickUpTypeItem } from "@/game/types/general";
import Resume from "./resume";

class PickUpFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        const itemName = params.placement.itemName as PickUpTypeItem;
        switch (itemName) {
            case "resume":
                return new Resume(params);
            default:
                const placementItemName: never = itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default PickUpFactory;
