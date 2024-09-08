import { Placement } from "@/game/types/general";
import CharacterObject from "../CharacterObject";
import MainCharacterComponent from "./mainCharacterComponent";
import React from "react";

class MainCharacter extends CharacterObject {
    constructor(placement: Placement) {
        super(placement);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(MainCharacterComponent);
    }
}

export default MainCharacter;
