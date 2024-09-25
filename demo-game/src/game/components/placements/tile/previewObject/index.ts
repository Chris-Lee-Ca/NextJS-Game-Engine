import { CustomPlacement } from "@/game/types/general";
import TileObject from "../TileObject";
import PreviewObjectComponent from "./PreviewObjectComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";
interface PreviewObjectPlacement extends CustomPlacement {
    itemName: string;
    avatar: any;
}

class PreviewObject extends TileObject {
    placement: PreviewObjectPlacement;
    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as PreviewObjectPlacement;
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(PreviewObjectComponent, { itemName: this.placement.itemName });
    }

    performCollisionLogic(object: GameObject): void {}
}

export default PreviewObject;
