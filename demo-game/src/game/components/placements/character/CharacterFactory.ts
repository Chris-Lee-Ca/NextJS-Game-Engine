import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import MainCharacter from "./mainCharacter";
import { CreateCustomObjectParams } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";

type CharacterCreator = (params: CreateCustomObjectParams) => GameObject;

const characterCreators: Record<string, CharacterCreator> = {
    "main character": (params) => new MainCharacter(params),
};

// Lets callers register a new character itemName -> creator without editing this file.
export const registerCharacterCreator = (itemName: string, creator: CharacterCreator): void => {
    characterCreators[itemName] = creator;
};

class CharacterFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        const creator = characterCreators[params.placement.itemName];
        if (!creator) {
            throw new Error(`Unknown placement itemName ${params.placement.itemName}`);
        }
        return creator(params);
    }
}

export default CharacterFactory;
