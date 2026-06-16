import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import { CreateCustomObjectParams } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";
import PatrolEnemy from "./patrolEnemy";

class EnemyFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        switch (params.placement.itemName) {
            case "patrol enemy":
                return new PatrolEnemy(params);
            default:
                throw new Error(`Unknown enemy itemName ${params.placement.itemName}`);
        }
    }
}

export default EnemyFactory;
