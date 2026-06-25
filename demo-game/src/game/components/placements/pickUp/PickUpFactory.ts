import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import GameObject from "game-engine/components/GameObject";
import { CreateCustomObjectParams } from "@/game/types/general";
import Resume from "./resume";

type PickUpCreator = (params: CreateCustomObjectParams) => GameObject;

const pickUpCreators: Record<string, PickUpCreator> = {
    resume: (params) => new Resume(params),
};

// Lets callers register a new pickup itemName -> creator without editing this file.
export const registerPickUpCreator = (itemName: string, creator: PickUpCreator): void => {
    pickUpCreators[itemName] = creator;
};

class PickUpFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        const creator = pickUpCreators[params.placement.itemName];
        if (!creator) {
            throw new Error(`Unknown placement itemName ${params.placement.itemName}`);
        }
        return creator(params);
    }
}

export default PickUpFactory;
