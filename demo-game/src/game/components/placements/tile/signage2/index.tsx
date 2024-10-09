import { CustomPlacement, SignageObjectPlacement } from "@/game/types/placement";
import Signage2Component from "./Signage2Component";
import React from "react";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import InteractableTileObject from "../InteractableTileObject";

class Signage2 extends InteractableTileObject {
    placement: SignageObjectPlacement;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as SignageObjectPlacement;
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(Signage2Component, {
            isUserNearSignage2: this.isUserNearObject,
            signageType: this.placement.signageType,
        });
    }
}

export default Signage2;
