import { Placement } from "@/gameEngine/types/general";
import GameObject from "@/gameEngine/ObjectPool/GameObject";

abstract class GameObjectFactory {
    public abstract createObject(placement: Placement): GameObject;
}

export default GameObjectFactory;
