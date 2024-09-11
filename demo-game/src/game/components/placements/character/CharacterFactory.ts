import { GameObject, GameObjectFactory } from "game-engine/objectPool";
import MainCharacter from "./mainCharacter";
import { CreateCustomObjectParams } from "@/game/types/general";

class CharacterFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        switch (params.placement.itemName) {
            case "main character":
                return new MainCharacter(params);
            default:
                const placementItemName = params.placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default CharacterFactory;
