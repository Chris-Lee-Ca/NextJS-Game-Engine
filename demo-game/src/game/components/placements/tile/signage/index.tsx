import { CustomPlacement, SignageObjectPlacement } from "@/game/types/general";
import TileObject from "../TileObject";
import SignageComponent from "./SignageComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";

class Signage extends TileObject {
    placement: SignageObjectPlacement;
    isUserNearSignage: boolean;

    private signageTimeout: NodeJS.Timeout | null = null;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as SignageObjectPlacement;
        this.isUserNearSignage = false;
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(SignageComponent, {isUserNearSignage: this.isUserNearSignage});
    }

    performCollisionLogic(object: GameObject): void {
        this.isUserNearSignage = true;

        // Clear any existing timeout to prevent it from resetting the flag while user is near
        if (this.signageTimeout) {
            clearTimeout(this.signageTimeout);
        }

        // Set a timeout to reset the flag after a 0.5 seconds delay
        this.signageTimeout = setTimeout(() => {
            this.isUserNearSignage = false;
        }, 500);
    }
}

export default Signage;
