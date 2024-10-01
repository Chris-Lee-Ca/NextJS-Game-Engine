import { CreateCustomObjectParams } from "@/game/types/general";
import ResumeComponent from "./ResumeComponent";
import React from "react";
import PickUpObject from "../PickUpObject";

class Resume extends PickUpObject {
    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
    }

    override update(deltaTime: number) {}

    renderPendingPickup(): React.ReactNode {
        return React.createElement(ResumeComponent);
    }
}

export default Resume;
