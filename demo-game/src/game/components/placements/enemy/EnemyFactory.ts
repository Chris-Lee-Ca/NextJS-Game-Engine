import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import { CreateCustomObjectParams } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";
import PatrolEnemy from "./patrolEnemy";

type EnemyCreator = (params: CreateCustomObjectParams) => GameObject;

const enemyCreators: Record<string, EnemyCreator> = {
    "patrol enemy": (params) => new PatrolEnemy(params),
};

// Lets callers register a new enemy itemName -> creator without editing this file.
export const registerEnemyCreator = (itemName: string, creator: EnemyCreator): void => {
    enemyCreators[itemName] = creator;
};

class EnemyFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        const creator = enemyCreators[params.placement.itemName];
        if (!creator) {
            throw new Error(`Unknown enemy itemName ${params.placement.itemName}`);
        }
        return creator(params);
    }
}

export default EnemyFactory;
