import GameObjectFactory from "@/game/core/ObjectPool/GameObjectFactory";
import CharacterFactory from "./character/CharacterFactory";
import EnemyFactory from "./enemy/EnemyFactory";
import PickUpFactory from "./pickUp/PickUpFactory";
import TileFactory from "./tile/TileFactory";
import { Placement } from "@/game/types/general";
import GameObject from "@/game/core/ObjectPool/GameObject";

class PlacementFactory extends GameObjectFactory {
    objectFactoryPool: { [key: string]: GameObjectFactory };

    constructor() {
        super();
        this.objectFactoryPool = {
            Character: new CharacterFactory(),
            Enemy: new EnemyFactory(),
            PickUp: new PickUpFactory(),
            Tile: new TileFactory(),
        };
    }

    createObject(placement: Placement): GameObject {
        const objectFactory: GameObjectFactory = this.objectFactoryPool[placement.type];
        return objectFactory.createObject(placement);
    }
}

export default PlacementFactory;
