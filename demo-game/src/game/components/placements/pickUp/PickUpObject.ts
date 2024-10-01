import { CustomPlacement } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";
import React from "react";
import { ReactNode } from "react";
import EmptyComponent from "./EmptyComponent";

abstract class PickUpObject extends GameObject {
    bound: Rectangle | undefined;
    isItemPickup: boolean;

    constructor(placement: CustomPlacement) {
        super(placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x + gridSize / 4, this.position.y, gridSize / 2, gridSize); // only cover the center part of the item
        this.isItemPickup = false;
    }

    abstract renderPendingPickup(): ReactNode;

    performCollisionLogic(_object: GameObject): void {
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
