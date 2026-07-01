import { CreateCustomObjectParams } from "@/game/types/general";
import TileObject from "../TileObject";
import FinishLineComponent from "./FinishLineComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";
import { openDialogWindow } from "@/game/redux/features/dialogSlice";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";
import { AppStore } from "@/game/redux/store";
import CharacterObject from "../../character/CharacterObject";

class FinishLine extends TileObject {
    store: AppStore;
    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.store = params.reduxStore;
        this.triggerBound = new Rectangle(this.position.x + gridSize / 4, this.position.y, gridSize / 2, gridSize); // only cover the center part of the item
    }

    override update(_deltaTime: number) {}

    render() {
        return React.createElement(FinishLineComponent);
    }

    openResumeDialog() {
        this.store.dispatch(openDialogWindow("finish-line"));
    }

    override onTriggerEnter(other: GameObject): void {
        if (!(other instanceof CharacterObject)) return;
        this.openResumeDialog();
    }
}

export default FinishLine;
