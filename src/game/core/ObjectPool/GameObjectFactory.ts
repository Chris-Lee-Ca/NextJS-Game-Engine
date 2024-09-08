import { Placement } from "@/game/types/general";
import GameObject from "./GameObject";

abstract class GameObjectFactory {
    public abstract createObject(placement: Placement): GameObject;
}

export default GameObjectFactory;
