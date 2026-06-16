import { CustomPlacement, RoadObjectPlacement } from "@/game/types/placement";
import TileObject from "../TileObject";
import React from "react";
import GameObject from "game-engine/components/GameObject";
import RoadComponentFactory from "./RoadComponentFactory";

class Road extends TileObject {
    placement: RoadObjectPlacement;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as RoadObjectPlacement;
    }

    override update(_deltaTime: number) {}

    render() {
        return React.createElement(RoadComponentFactory, {
            roadType: this.placement.roadType,
            facing: this.placement.facing,
        });
    }

    performCollisionLogic(_object: GameObject): void {}
}

export default Road;
