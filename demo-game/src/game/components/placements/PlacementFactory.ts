import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import CharacterFactory from "./character/CharacterFactory";
// import EnemyFactory from "./enemy/EnemyFactory";
// import PickUpFactory from "./pickUp/PickUpFactory";
import TileFactory from "./tile/TileFactory";
import { CreateCustomObjectParams } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";

class PlacementFactory extends GameObjectFactory {
    objectFactoryPool: { [key: string]: GameObjectFactory };

    constructor() {
        super();
        this.objectFactoryPool = {
            Character: new CharacterFactory(),
            // Enemy: new EnemyFactory(),
            // PickUp: new PickUpFactory(),
            Tile: new TileFactory(),
        };
    }

    createObject(params: CreateCustomObjectParams): GameObject {
        const objectFactory: GameObjectFactory = this.objectFactoryPool[params.placement.type];
        return objectFactory.createObject(params);
    }
}

export default PlacementFactory;
