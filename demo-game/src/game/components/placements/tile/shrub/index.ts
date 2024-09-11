import { CustomPlacement } from "@/game/types/general";
import TileObject from "../TileObject";
import ShrubComponent from "./ShrubComponent";
import React from "react";

class Shrub extends TileObject {
    constructor(placement: CustomPlacement) {
        super(placement);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(ShrubComponent);
    }
}

export default Shrub;
