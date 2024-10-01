import { AppStore } from "../redux/store";
import { Placement } from "../types/general";
import GameObject from "./GameObject";

export type CreateObjectParams<StoreType = AppStore> = {
    placement: Placement;
    reduxStore?: StoreType;
};

export abstract class GameObjectFactory<StoreType = AppStore> {
    public abstract createObject(params: CreateObjectParams<StoreType>): GameObject;
}
