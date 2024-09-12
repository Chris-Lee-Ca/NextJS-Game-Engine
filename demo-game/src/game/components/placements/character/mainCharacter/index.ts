import CharacterObject from "../CharacterObject";
import MainCharacterComponent from "./mainCharacterComponent";
import React from "react";
import { CreateCustomObjectParams } from "@/game/types/general";
import { AppStore } from "@/game/redux/store";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";
import { DirectionCommand, Facing } from "game-engine/redux/modules/MainCharacterControlModule/types";
import { getCharacterOffset } from "game-engine/redux/modules/MainCharacterControlModule";

class MainCharacter extends CharacterObject {
    store: AppStore;
    facing: Facing;
    movingSpeed: number;
    bound: Rectangle;
    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
        this.store = params.reduxStore;
        this.facing = "none";
        this.movingSpeed = 10;

        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(deltaTime: number) {
        const state = this.store.getState();
        const movmentDirection = state.mainCharacter.movmentDirection;
        this.facing = this.getFacing(movmentDirection);

        const mainCharacterOffset = getCharacterOffset(movmentDirection, this.movingSpeed, deltaTime);
        this.position = {
            x: this.position.x + mainCharacterOffset.x,
            y: this.position.y + mainCharacterOffset.y,
        };
        this.bound.setPosition(this.position.x, this.position.y);
    }

    getBounds(): Rectangle {
        return this.bound;
    }

    render() {
        return React.createElement(MainCharacterComponent, { facing: this.facing, position: this.position });
    }

    private getFacing(movmentDirection: DirectionCommand): Facing {
        switch (movmentDirection) {
            case "up":
                return "up";
            case "down":
                return "down";
            case "left":
                return "left";
            case "right":
                return "right";
            case "":
                return "none";
            default:
                const facing: never = movmentDirection;
                throw new Error(`Unknown movmentDirection ${movmentDirection}`);
        }
    }
}

export default MainCharacter;
