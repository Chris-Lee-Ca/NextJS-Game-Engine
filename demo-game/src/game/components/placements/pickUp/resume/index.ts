import { CreateCustomObjectParams } from "@/game/types/general";
import ResumeComponent from "./ResumeComponent";
import React from "react";
import PickUpObject from "../PickUpObject";
import GameObject from "game-engine/components/GameObject";
import { openDialogWindow } from "@/game/redux/features/dialogSlice";

class Resume extends PickUpObject {
    constructor(params: CreateCustomObjectParams) {
        super(params);
    }

    override update(deltaTime: number) {}

    override renderPendingPickup(): React.ReactNode {
        return React.createElement(ResumeComponent);
    }

    openResumeDialog() {
        this.store.dispatch(openDialogWindow("resume"));
    }

    override performCollisionLogic(object: GameObject): void {
        // Show the dialog when a collision happens
        this.openResumeDialog();
        super.performCollisionLogic(object);
    }
}

export default Resume;
