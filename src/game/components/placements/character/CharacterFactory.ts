import { Placement } from "@/gameEngine/types/general";
import GameObject from "@/gameEngine/ObjectPool/GameObject";
import GameObjectFactory from "@/gameEngine/ObjectPool/GameObjectFactory";
import MainCharacter from "./mainCharacter";

class CharacterFactory extends GameObjectFactory {
    public createObject(placement: Placement): GameObject {
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
