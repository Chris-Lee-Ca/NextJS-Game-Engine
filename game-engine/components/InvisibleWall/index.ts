import { ReactNode } from "react";
import GameObject from "../GameObject";
import Rectangle from "../Rectangle";
import GridHelper from "../../helper/GridHelper";
import { LevelInfo } from "../../redux/modules/levelModule/types";
import InvisibleWallComponent from "./InvisibleWallComponent";
import React from "react";
import { CreateObjectParams } from "../GameObjectFactory";

class InvisibleWall extends GameObject {
    constructor(params: CreateObjectParams) {
        super(params.placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }
    update(deltaTime: number): void {}
    render(): ReactNode {
        return React.createElement(InvisibleWallComponent);
    }
    performCollisionLogic(object: GameObject): void {}
}

export default InvisibleWall;
