import { Placement } from "../types/general";
import { GameObject } from "./GameObject";

export abstract class GameObjectFactory {
    public abstract createObject(placement: Placement): GameObject;
}
