import CharacterObject from "../CharacterObject";
import MainCharacterComponent from "./mainCharacterComponent";
import React from "react";
import { CreateCustomObjectParams } from "@/game/types/general";
import { AppStore } from "@/game/redux/store";
import Rectangle from "game-engine/components/Rectangle";
import GridHelper from "game-engine/helper/GridHelper";
import {
    getCharacterOffset,
    DirectionCommand,
    Facing,
    MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID,
} from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import { setIsRunning, DOUBLE_TAP_RUN_PLUGIN_ID } from "game-engine/extensions/plugins/doubleTapRunPlugin";
import { Vector2 } from "game-engine/types/general";
import GameObject from "game-engine/components/GameObject";
import Converter from "game-engine/helper/Converter";

const KNOCKBACK_TOTAL_PX = GridHelper.getGridSizeInPixel() * 1.4;
// Travel the full knockback distance in ~180ms for a snappy but visible slide.
const KNOCKBACK_SPEED_PX_PER_MS = KNOCKBACK_TOTAL_PX / 180;

interface KnockbackState {
    directionX: number; // normalised (-1 or 1)
    directionY: number;
    remaining: number;  // pixels left to travel
}

class MainCharacter extends CharacterObject {
    store: AppStore;
    facing: Facing;
    movingSpeed: number;
    bound: Rectangle;
    legArea: { xOffset: number; yOffset: number; width: number; height: number };
    private knockbackState: KnockbackState | null = null;
    private hurtKey: number = 0;

    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
        this.store = params.reduxStore;
        this.facing = "none";
        this.movingSpeed = 10;

        const gridSize = GridHelper.getGridSizeInPixel();
        this.legArea = {
            xOffset: gridSize / 3,
            yOffset: gridSize * 0.8,
            width: gridSize / 2.4,
            height: gridSize / 5,
        };
        this.bound = new Rectangle(
            this.position.x + this.legArea.xOffset,
            this.position.y + this.legArea.xOffset,
            this.legArea.width,
            this.legArea.height
        ); // bound only cover the leg part of the character
    }

    override update(deltaTime: number) {
        // Knockback animation takes priority — ignore player input until it finishes.
        if (this.knockbackState !== null) {
            this.processKnockback(deltaTime);
            return;
        }

        const state = this.store.getState();
        const movementDirection = state[MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID].movementDirection;
        // Run mode doubles movement speed; activated via double-tap on a direction key.
        this.movingSpeed = state[DOUBLE_TAP_RUN_PLUGIN_ID].isRunning ? 20 : 10;
        this.facing = this.getFacing(movementDirection);

        const characterOffset = getCharacterOffset(movementDirection, this.movingSpeed, deltaTime);
        const characterNewPosition = {
            x: this.position.x + characterOffset.x,
            y: this.position.y + characterOffset.y,
        };
        const characterNewBound = this.bound
            .clone()
            .setPosition(characterNewPosition.x + this.legArea.xOffset, characterNewPosition.y + this.legArea.yOffset);

        const collisionList = this.checkCollision(characterNewBound);
        if (collisionList.length !== 0) {
            for (const object of collisionList) {
                object.performCollisionLogic(this);
                // Hitting an enemy while moving: knock back in the opposite direction of travel.
                if (object.id.startsWith("Enemy-")) {
                    this.startKnockback(0, 0); // movement direction is active, no fallback needed
                }
            }
            return;
        }
        this.performMovment(characterNewPosition, characterNewBound);
    }

    render() {
        return React.createElement(MainCharacterComponent, {
            facing: this.facing,
            position: this.position,
            bound: this.bound,
            isKnockedBack: this.knockbackState !== null,
            hurtKey: this.hurtKey,
        });
    }

    // Called when an enemy walks into the player.
    performCollisionLogic(object: GameObject): void {
        if (object.id.startsWith("Enemy-")) {
            // Fallback direction: away from the enemy (used when player is standing still).
            const enemyCenterX = object.bound ? object.bound.getCenter().x : object.position.x;
            const myCenterX = this.bound.getCenter().x;
            const fallbackDirX = myCenterX >= enemyCenterX ? 1 : -1;
            this.startKnockback(fallbackDirX, 0);
        }
    }

    // Prefers the opposite of the player's current movement direction so the knockback
    // feels like a natural rebound. Falls back to (fallbackDirX, fallbackDirY) when idle.
    private startKnockback(fallbackDirX: number, fallbackDirY: number): void {
        const movementDirection =
            this.store.getState()[MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID].movementDirection;

        let dirX: number;
        let dirY: number;
        switch (movementDirection) {
            case "right": dirX = -1; dirY =  0; break;
            case "left":  dirX =  1; dirY =  0; break;
            case "down":  dirX =  0; dirY = -1; break;
            case "up":    dirX =  0; dirY =  1; break;
            default:
                dirX = fallbackDirX;
                dirY = fallbackDirY;
        }

        if (dirX === 0 && dirY === 0) return;

        this.hurtKey = Date.now();
        this.store.dispatch(setIsRunning(false));
        this.knockbackState = { directionX: dirX, directionY: dirY, remaining: KNOCKBACK_TOTAL_PX };
    }

    private processKnockback(deltaTime: number): void {
        const kb = this.knockbackState!;
        const moveThisFrame = Math.min(KNOCKBACK_SPEED_PX_PER_MS * deltaTime, kb.remaining);

        const newPosition: Vector2 = {
            x: this.position.x + kb.directionX * moveThisFrame,
            y: this.position.y + kb.directionY * moveThisFrame,
        };
        const newBound = this.bound
            .clone()
            .setPosition(newPosition.x + this.legArea.xOffset, newPosition.y + this.legArea.yOffset);

        // Stop at any obstacle hit during the slide.
        const collisionList = this.checkCollision(newBound);
        if (collisionList.length > 0) {
            this.knockbackState = null;
            return;
        }

        this.position = newPosition;
        this.bound = newBound;

        kb.remaining -= moveThisFrame;
        if (kb.remaining <= 0) {
            this.knockbackState = null;
        }
    }

    private getFacing(movementDirection: DirectionCommand): Facing {
        switch (movementDirection) {
            case "up":
                return "up";
            case "down":
                return "down";
            case "left":
                return "left";
            case "right":
                return "right";
            case "":
                return "none";
            default:
                const facing: never = movementDirection;
                throw new Error(`Unknown movementDirection ${facing as string}`);
        }
    }

    private performMovment(characterNewPosition: Vector2, characterNewBound: Rectangle) {
        this.position = characterNewPosition;
        this.bound = characterNewBound;
        this.coord = Converter.vectorToCoord(this.bound.getCenter());
    }
}

export default MainCharacter;
