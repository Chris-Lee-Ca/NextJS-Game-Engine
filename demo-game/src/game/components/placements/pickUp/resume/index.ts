import { CreateCustomObjectParams } from "@/game/types/general";
import ResumeComponent from "./ResumeComponent";
import React from "react";
import PickUpObject from "../PickUpObject";
import GameObject from "game-engine/components/GameObject";
import { openDialogWindow } from "@/game/redux/features/dialogSlice";
import CharacterObject from "../../character/CharacterObject";

class Resume extends PickUpObject {
    constructor(params: CreateCustomObjectParams) {
        super(params);
    }

    override update(_deltaTime: number) {}

    override renderPendingPickup(): React.ReactNode {
        return React.createElement(ResumeComponent);
    }

    openResumeDialog() {
        this.store.dispatch(openDialogWindow("resume"));
    }

    override onTriggerEnter(other: GameObject): void {
        if (!(other instanceof CharacterObject)) return;
        // Show the dialog when the player enters this zone
        this.openResumeDialog();
        super.onTriggerEnter(other);
    }
}

export default Resume;
