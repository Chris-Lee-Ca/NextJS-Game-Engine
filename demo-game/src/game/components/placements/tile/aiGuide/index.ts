import { CustomPlacement } from "@/game/types/placement";
import AiGuideComponent from "./AiGuideComponent";
import React from "react";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import InteractableTileObject from "../InteractableTileObject";

export interface AiGuidePlacement extends CustomPlacement {
    npcId: string;
    npcName?: string;
}

class AiGuide extends InteractableTileObject {
    private npcId: string;
    private npcName: string;

    constructor(placement: AiGuidePlacement) {
        super(placement);
        this.npcId = placement.npcId;
        this.npcName = placement.npcName ?? "Guide";
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(_deltaTime: number) {}

    render() {
        return React.createElement(AiGuideComponent, {
            isUserNearNPC: this.isUserNearObject,
            npcId: this.npcId,
            npcName: this.npcName,
        });
    }
}

export default AiGuide;
