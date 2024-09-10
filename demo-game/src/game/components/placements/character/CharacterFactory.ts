import { GameObject, GameObjectFactory } from "game-engine/objectPool";
import MainCharacter from "./mainCharacter";
import { CustomPlacement } from "@/game/types/general";

class CharacterFactory extends GameObjectFactory {
    public createObject(placement: CustomPlacement): GameObject {
        switch (placement.itemName) {
            case "main character":
                return new MainCharacter(placement);
            default:
                const placementItemName = placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default CharacterFactory;
