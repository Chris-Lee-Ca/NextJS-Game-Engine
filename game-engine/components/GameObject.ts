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
    triggerBound?: Rectangle;

    constructor(placement: Placement) {
        this.id = placement.id;
        this.coord = placement.coord;
        this.position = Converter.coordToVector(this.coord);
    }

    abstract update(deltaTime: number): void;

    abstract render(): ReactNode;

    onTriggerEnter(_other: GameObject): void {}

    onTriggerExit(_other: GameObject): void {}

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

    performCollisionLogic(_object: GameObject): void {}

    protected moveAndCollide(
        newPosition: Vector2,
        newBound: Rectangle,
        onCommit?: () => void,
    ): { blocked: boolean; collisions: GameObject[] } {
        const collisions = this.checkCollision(newBound);
        for (const object of collisions) {
            object.performCollisionLogic(this);
        }
        const blocked = collisions.length > 0;
        if (!blocked) {
            this.position = newPosition;
            this.bound = newBound;
            onCommit?.(); // called after position/bound are set, for any extra derived state
        }
        return { blocked, collisions };
    }

    toString(): string {
        return `GameObject: type -- ${typeof this}, id -- ${this.id}`;
    }
}

export default GameObject;
