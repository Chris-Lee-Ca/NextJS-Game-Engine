import { CustomPlacement, SchoolObjectPlacement } from "@/game/types/placement";
import SchoolComponent from "./SchoolComponent";
import React from "react";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import InteractableTileObject from "../InteractableTileObject";

class School extends InteractableTileObject {
    placement: SchoolObjectPlacement;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as SchoolObjectPlacement;
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(SchoolComponent, {
            isUserNearSchool: this.isUserNearObject,
            schoolType: this.placement.schoolType,
        });
    }
}

export default School;
