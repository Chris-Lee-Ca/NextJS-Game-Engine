import { CustomPlacement } from "@/game/types/general";
import TileObject from "../TileObject";
import BalloonComponent from "./BalloonComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";

class Balloon extends TileObject {
    constructor(placement: CustomPlacement) {
        super(placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(BalloonComponent);
    }

    performCollisionLogic(object: GameObject): void {}
}

export default Balloon;
