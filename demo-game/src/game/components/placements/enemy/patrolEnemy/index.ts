import EnemyObject from "../EnemyObject";
import PatrolEnemyComponent from "./PatrolEnemyComponent";
import React from "react";
import { CreateCustomObjectParams } from "@/game/types/general";
import { PatrolDirection, PatrolEnemyObjectPlacement } from "@/game/types/placement";
import { AppStore } from "@/game/redux/store";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";

const PATROL_SPEED = 4;

const reverseDirection: Record<PatrolDirection, PatrolDirection> = {
    left: "right",
    right: "left",
    up: "down",
    down: "up",
};

class PatrolEnemy extends EnemyObject {
    store: AppStore;
    patrolDirection: PatrolDirection;
    bound: Rectangle;

    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
        this.store = params.reduxStore;
        const placement = params.placement as PatrolEnemyObjectPlacement;
        this.patrolDirection = placement.patrolDirection ?? "right";

        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(
            this.position.x + gridSize * 0.1,
            this.position.y + gridSize * 0.15,
            gridSize * 0.8,
            gridSize * 0.75
        );
    }

    override update(deltaTime: number): void {
        const gridSize = GridHelper.getGridSizeInPixel();
        const horizontal = this.patrolDirection === "left" || this.patrolDirection === "right";
        const sign = this.patrolDirection === "right" || this.patrolDirection === "down" ? 1 : -1;
        const moveAmount = (PATROL_SPEED * deltaTime) / gridSize;

        const newPosition = horizontal
            ? { x: this.position.x + sign * moveAmount, y: this.position.y }
            : { x: this.position.x, y: this.position.y + sign * moveAmount };

        const newBound = this.bound
            .clone()
            .setPosition(newPosition.x + gridSize * 0.1, newPosition.y + gridSize * 0.15);

        const { blocked } = this.moveAndCollide(newPosition, newBound);
        if (blocked) this.patrolDirection = reverseDirection[this.patrolDirection];
    }

    render() {
        return React.createElement(PatrolEnemyComponent, {
            position: this.position,
            bound: this.bound,
            facing: this.patrolDirection,
        });
    }
}

export default PatrolEnemy;
