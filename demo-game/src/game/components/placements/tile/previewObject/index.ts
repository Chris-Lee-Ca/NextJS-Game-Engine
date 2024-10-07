import { CustomPlacement, PreviewObjectPlacement } from "@/game/types/general";
import TileObject from "../TileObject";
import PreviewObjectComponent from "./PreviewObjectComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";
import Rectangle from "game-engine/components/Rectangle";

class PreviewObject extends TileObject {
    placement: PreviewObjectPlacement;
    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as PreviewObjectPlacement;
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(PreviewObjectComponent, {
            objectItemName: this.placement.previewObjectItem.objectItemName,
        });
    }

    performCollisionLogic(object: GameObject): void {}
}

export default PreviewObject;
