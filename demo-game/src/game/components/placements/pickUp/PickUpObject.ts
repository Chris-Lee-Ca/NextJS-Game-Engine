import { CreateCustomObjectParams, PickUpTypeItem } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";
import React from "react";
import { ReactNode } from "react";
import EmptyComponent from "./EmptyComponent";
import { AppStore } from "@/game/redux/store";
import { addItemToBackpack } from "@/game/redux/features/backpackSlice";

abstract class PickUpObject extends GameObject {
    bound: Rectangle | undefined;
    isItemPickup: boolean;
    store: AppStore;
    itemName: PickUpTypeItem;

    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.store = params.reduxStore;
        this.itemName = params.placement.itemName as PickUpTypeItem;
        this.bound = new Rectangle(this.position.x + gridSize / 4, this.position.y, gridSize / 2, gridSize); // only cover the center part of the item
        this.isItemPickup = false;
    }

    abstract renderPendingPickup(): ReactNode;

    performCollisionLogic(_object: GameObject): void {
        this.store.dispatch(addItemToBackpack(this.itemName));
        this.isItemPickup = true;
        this.bound = undefined;
    }

    render(): ReactNode {
        if (!this.isItemPickup) {
            return this.renderPendingPickup();
        }
        return React.createElement(EmptyComponent);
    }
}

export default PickUpObject;
