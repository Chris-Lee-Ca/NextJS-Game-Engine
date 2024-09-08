import { LevelInfo, Placement, Position } from "@/game/types/general";
import { ReactNode } from "react";

abstract class GameObject {
    id: string;
    position: Position;

    constructor(placement: Placement) {
        this.id = placement.id;
        this.position = placement.position;
    }

    abstract update(deltaTime: number): void;

    abstract render(): ReactNode;

    toString(): string {
        return `GameObject: type -- ${typeof this}, id -- ${this.id}`;
    }
}

export default GameObject;
