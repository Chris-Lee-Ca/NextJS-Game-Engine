import { CustomPlacement } from "@/game/types/general";
import GameObject from "@/gameEngine/ObjectPool/GameObject";
import GameObjectFactory from "@/gameEngine/ObjectPool/GameObjectFactory";

class PickUpFactory extends GameObjectFactory {
    public createObject(placement: CustomPlacement): GameObject {
        switch (placement.itemName) {
            default:
                const placementItemName = placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default PickUpFactory;
