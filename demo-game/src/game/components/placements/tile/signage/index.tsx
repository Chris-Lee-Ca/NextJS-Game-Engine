import { CustomPlacement, SignageObjectPlacement } from "@/game/types/general";
import SignageComponent from "./SignageComponent";
import React from "react";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import InteractableTileObject from "../InteractableTileObject";

class Signage extends InteractableTileObject {
    placement: SignageObjectPlacement;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as SignageObjectPlacement;
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(SignageComponent, {isUserNearSignage: this.isUserNearSignage});
    }
}

export default Signage;
