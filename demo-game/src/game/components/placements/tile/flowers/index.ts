import { CustomPlacement } from "@/game/types/placement";
import TileObject from "../TileObject";
import FlowersComponent from "./FlowersComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";

class Flowers extends TileObject {
    constructor(placement: CustomPlacement) {
        super(placement);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(FlowersComponent);
    }

    performCollisionLogic(object: GameObject): void {}
}

export default Flowers;
