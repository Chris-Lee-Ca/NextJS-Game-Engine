import { CustomPlacement, PaintingObjectPlacement } from "@/game/types/placement";
import PaintingComponent from "./PaintingComponent";
import React from "react";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import InteractableTileObject from "../InteractableTileObject";

class Painting extends InteractableTileObject {
    placement: PaintingObjectPlacement;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as PaintingObjectPlacement;
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(PaintingComponent, {
            isUserNearPainting: this.isUserNearObject,
            paintingType: this.placement.paintingType,
        });
    }
}

export default Painting;
