import { Placement } from "@/game/types/general";
import GameObject from "../../../core/ObjectPool/GameObject";
import GameObjectFactory from "../../../core/ObjectPool/GameObjectFactory";

class PickUpFactory extends GameObjectFactory {
    public createObject(placement: Placement): GameObject {
        switch (placement.itemName) {
            default:
                const placementItemName = placement.itemName;
                throw new Error(`Unknown placement itemName ${placementItemName}`);
        }
    }
}

export default PickUpFactory;
