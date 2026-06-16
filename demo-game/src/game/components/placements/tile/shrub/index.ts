import { CustomPlacement } from "@/game/types/placement";
import TileObject from "../TileObject";
import ShrubComponent from "./ShrubComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";

class Shrub extends TileObject {
    constructor(placement: CustomPlacement) {
        super(placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(_deltaTime: number) {}

    render() {
        return React.createElement(ShrubComponent);
    }

    performCollisionLogic(_object: GameObject): void {}
}

export default Shrub;
