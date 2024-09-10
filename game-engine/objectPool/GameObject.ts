import { ReactNode } from "react";
import { Placement, Position } from "../types/general";

export abstract class GameObject {
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