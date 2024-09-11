import { GameObject, GameObjectFactory } from "game-engine/objectPool";
import { CreateCustomObjectParams } from "@/game/types/general";

class EnemyFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        switch (params.placement.itemName) {
            default:
                const placementItemName = params.placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default EnemyFactory;
