import { CustomPlacement } from "@/game/types/general";
import TileObject from "../TileObject";
import SignageComponent from "./SignageComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";

class Signage extends TileObject {
    constructor(placement: CustomPlacement) {
        super(placement);
        this.bound = undefined;
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(SignageComponent);
    }

    performCollisionLogic(object: GameObject): void {}
}

export default Signage;
