import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import CharacterFactory from "./character/CharacterFactory";
import EnemyFactory from "./enemy/EnemyFactory";
import PickUpFactory from "./pickUp/PickUpFactory";
import TileFactory from "./tile/TileFactory";
import { CreateCustomObjectParams } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";

const objectFactoryPool: { [key: string]: GameObjectFactory } = {
    Character: new CharacterFactory(),
    Enemy: new EnemyFactory(),
    PickUp: new PickUpFactory(),
    Tile: new TileFactory(),
};

// Lets callers register a new top-level placement type -> factory without editing this file.
export const registerPlacementFactory = (type: string, factory: GameObjectFactory): void => {
    objectFactoryPool[type] = factory;
};

class PlacementFactory extends GameObjectFactory {
    createObject(params: CreateCustomObjectParams): GameObject {
        const objectFactory = objectFactoryPool[params.placement.type];
        if (!objectFactory) {
            throw new Error(`Unknown placement type: ${params.placement.type}`);
        }
        return objectFactory.createObject(params);
    }
}

export default PlacementFactory;
