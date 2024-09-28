import CharacterObject from "../CharacterObject";
import MainCharacterComponent from "./mainCharacterComponent";
import React from "react";
import { CreateCustomObjectParams } from "@/game/types/general";
import { AppStore } from "@/game/redux/store";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";
import { DirectionCommand, Facing } from "game-engine/redux/modules/MainCharacterControlModule/types";
import { getCharacterOffset } from "game-engine/redux/modules/MainCharacterControlModule";
import { Vector2 } from "game-engine/types/general";
import GameObject from "game-engine/components/GameObject";
import Converter from "game-engine/helper/Converter";

class MainCharacter extends CharacterObject {
    store: AppStore;
    facing: Facing;
    movingSpeed: number;
    bound: Rectangle;
    legArea: { xOffset: number; yOffset: number; width: number; height: number };
    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
        this.store = params.reduxStore;
        this.facing = "none";
        this.movingSpeed = 10;

        const gridSize = GridHelper.getGridSizeInPixel();
        this.legArea = {
            xOffset: gridSize / 3,
            yOffset: gridSize * 0.8,
            width: gridSize / 2.4,
            height: gridSize / 5,
        };
        this.bound = new Rectangle(
            this.position.x + this.legArea.xOffset,
            this.position.y + this.legArea.xOffset,
            this.legArea.width,
            this.legArea.height
        ); // bound only cover the leg part of the character
    }

    override update(deltaTime: number) {
        const state = this.store.getState();
        const movmentDirection = state.mainCharacter.movmentDirection;
        this.facing = this.getFacing(movmentDirection);

        const characterOffset = getCharacterOffset(movmentDirection, this.movingSpeed, deltaTime);
        const characterNewPosition = {
            x: this.position.x + characterOffset.x,
            y: this.position.y + characterOffset.y,
        };
        const characterNewBound = this.bound
            .clone()
            .setPosition(characterNewPosition.x + this.legArea.xOffset, characterNewPosition.y + this.legArea.yOffset);

        const collisionList = this.checkCollision(characterNewBound);
        if (collisionList.length !== 0) {
            for (const object of collisionList) {
                object.performCollisionLogic(this);
            }
            return;
        }
        this.performMovment(characterNewPosition, characterNewBound);
    }

    render() {
        return React.createElement(MainCharacterComponent, {
            facing: this.facing,
            position: this.position,
            bound: this.bound,
        });
    }

    performCollisionLogic(object: GameObject): void {}

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

    private performMovment(characterNewPosition: Vector2, characterNewBound: Rectangle) {
        this.position = characterNewPosition;
        this.coord = Converter.vectorToCoord(this.position);
        this.bound = characterNewBound;
    }
}

export default MainCharacter;
