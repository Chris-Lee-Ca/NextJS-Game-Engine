import { CustomPlacement } from "@/game/types/general";
import TileObject from "../TileObject";
import ShrubComponent from "./ShrubComponent";
import React from "react";

class Shrub extends TileObject {
    x: number;
    y: number;
    constructor(placement: CustomPlacement) {
        super(placement);
        this.x = 0;
        this.y = 0;
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(ShrubComponent, { x: this.x, y: this.y });
    }
}

export default Shrub;
