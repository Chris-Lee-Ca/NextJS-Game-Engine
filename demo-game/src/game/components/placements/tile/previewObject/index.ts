import { CustomPlacement, PreviewObjectPlacement } from "@/game/types/placement";
import TileObject from "../TileObject";
import PreviewObjectComponent from "./PreviewObjectComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";

class PreviewObject extends TileObject {
    placement: PreviewObjectPlacement;
    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as PreviewObjectPlacement;
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(PreviewObjectComponent, {
            previewObjectItem: this.placement.previewObjectItem,
        });
    }

    performCollisionLogic(object: GameObject): void {}
}

export default PreviewObject;
