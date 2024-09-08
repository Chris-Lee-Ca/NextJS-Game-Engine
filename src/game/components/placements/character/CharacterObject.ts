import GameObject from "@/game/core/ObjectPool/GameObject";
import { ReactNode } from "react";

class CharacterObject extends GameObject {
    update(deltaTime: number): void {
        throw new Error("Method not implemented.");
    }
    render(): ReactNode {
        throw new Error("Method not implemented.");
    }
}

export default CharacterObject;
