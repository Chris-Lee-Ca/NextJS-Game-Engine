import { ReactNode } from "react";
import { GameObject } from "game-engine/objectPool";

class CharacterObject extends GameObject {
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    render(): ReactNode {
        throw new Error("Method not implemented.");
    }
}

export default CharacterObject;
