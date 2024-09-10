import { GameObject, GameObjectFactory } from "game-engine/objectPool";
import { CustomPlacement } from "@/game/types/general";

class EnemyFactory extends GameObjectFactory {
    public createObject(placement: CustomPlacement): GameObject {
        switch (placement.itemName) {
            default:
                const placementItemName = placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default EnemyFactory;
