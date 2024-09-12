import { ReactNode } from "react";
import { Coordinate, Placement, Vector2 } from "../types/general";
import Converter from "../helper/Converter";
import Rectangle from "./Rectangle";
import ObjectPool from "../core/ObjectPool";

abstract class GameObject {
    id: string;
    coord: Coordinate;
    position: Vector2;
    bound: Rectangle | undefined;

    constructor(placement: Placement) {
        this.id = placement.id;
        this.coord = placement.coord;
        this.position = Converter.coordToVector(this.coord);
    }

    abstract update(deltaTime: number): void;

    abstract render(): ReactNode;

    checkCollision(bound: Rectangle): GameObject[] {
        const collisionList: GameObject[] = [];
        for (let [object_id, object] of ObjectPool) {
            if (object_id === this.id) continue;
            if (typeof object.bound === "undefined") continue;
            if (bound.overlaps(object.bound)) {
                collisionList.push(object);
            }
        }
        return collisionList;
    }

    abstract performCollisionLogic(object: GameObject): void;

    toString(): string {
        return `GameObject: type -- ${typeof this}, id -- ${this.id}`;
    }
}

export default GameObject;
