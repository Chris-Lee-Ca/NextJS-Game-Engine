import { Placement } from "@/game/types/general";
import CharacterObject from "../CharacterObject";
import MainCharacterComponent from "./mainCharacterComponent";
import React from "react";

class MainCharacter extends CharacterObject {
    x: number;
    y: number;
    constructor(placement: Placement) {
        super(placement);
        this.x = 0;
        this.y = 0;
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(MainCharacterComponent, { x: this.x, y: this.y });
    }
}

export default MainCharacter;
