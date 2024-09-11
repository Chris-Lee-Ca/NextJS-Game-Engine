import { AppStore } from "../redux/store";
import { Placement } from "../types/general";
import GameObject from "./GameObject";

export type CreateObjectParams = {
    placement: Placement;
    reduxStore?: AppStore;
};

export abstract class GameObjectFactory {
    public abstract createObject(params: CreateObjectParams): GameObject;
}
