import { ReactNode } from "react";
import { Coordinate, Placement, Vector2 } from "../types/general";
import Converter from "../helper/Converter";

abstract class GameObject {
    id: string;
    coord: Coordinate;
    position: Vector2;

    constructor(placement: Placement) {
        this.id = placement.id;
        this.coord = placement.coord;
        this.position = Converter.coordToVector(this.coord);
    }

    abstract update(deltaTime: number): void;

    abstract render(): ReactNode;

    toString(): string {
        return `GameObject: type -- ${typeof this}, id -- ${this.id}`;
    }
}

export default GameObject;
