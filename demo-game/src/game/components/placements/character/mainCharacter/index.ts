import CharacterObject from "../CharacterObject";
import MainCharacterComponent from "./mainCharacterComponent";
import React from "react";
import { CreateCustomObjectParams } from "@/game/types/general";
import { AppStore } from "@/game/redux/store";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";

class MainCharacter extends CharacterObject {
    store: AppStore;
    bound: Rectangle;
    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
        this.store = params.reduxStore;
        const state = this.store.getState();
        const mainCharacterPixelPosition = state.mainCharacter.mainCharacterPixelPosition;
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(mainCharacterPixelPosition, gridSize, gridSize);
    }

    override update(deltaTime: number) {
        const state = this.store.getState();
        const mainCharacterPixelPosition = state.mainCharacter.mainCharacterPixelPosition;
        this.position = mainCharacterPixelPosition;
        this.bound.setCenter(mainCharacterPixelPosition);
    }

    getBounds(): Rectangle {
        return this.bound;
    }

    render() {
        return React.createElement(MainCharacterComponent);
    }
}

export default MainCharacter;
