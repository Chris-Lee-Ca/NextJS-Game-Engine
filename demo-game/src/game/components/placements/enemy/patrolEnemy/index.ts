import EnemyObject from "../EnemyObject";
import PatrolEnemyComponent from "./PatrolEnemyComponent";
import React from "react";
import { CreateCustomObjectParams } from "@/game/types/general";
import { PatrolDirection, PatrolEnemyObjectPlacement } from "@/game/types/placement";
import { AppStore } from "@/game/redux/store";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";
import GameObject from "game-engine/components/GameObject";
import { LEVEL_PLUGIN_ID } from "game-engine/extensions/plugins/levelPlugin";

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

        const state = this.store.getState();
        const currentLevel = state[LEVEL_PLUGIN_ID].currentLevel;
        const levelInfo = state[LEVEL_PLUGIN_ID].allLevelInfo[currentLevel];
        const levelPixelWidth = levelInfo ? levelInfo.tilesWidth * gridSize : Infinity;
        const levelPixelHeight = levelInfo ? levelInfo.tilesHeight * gridSize : Infinity;

        const hitEdge = horizontal
            ? newPosition.x < 0 || newPosition.x + gridSize > levelPixelWidth
            : newPosition.y < 0 || newPosition.y + gridSize > levelPixelHeight;

        if (hitEdge) {
            this.patrolDirection = reverseDirection[this.patrolDirection];
            return;
        }

        const collisionList = this.checkCollision(newBound);
        if (collisionList.length > 0) {
            this.patrolDirection = reverseDirection[this.patrolDirection];
            for (const object of collisionList) {
                object.performCollisionLogic(this);
            }
            return;
        }

        this.position = newPosition;
        this.bound = newBound;
    }

    render() {
        return React.createElement(PatrolEnemyComponent, {
            position: this.position,
            bound: this.bound,
            facing: this.patrolDirection,
        });
    }

    performCollisionLogic(_object: GameObject): void {}
}

export default PatrolEnemy;
