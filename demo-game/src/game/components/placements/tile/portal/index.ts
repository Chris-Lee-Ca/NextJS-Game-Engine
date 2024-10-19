import { CreateCustomObjectParams } from "@/game/types/general";
import TileObject from "../TileObject";
import PortalComponent from "./PortalComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";
import { AppStore } from "@/game/redux/store";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import { AllLevelInfo, LevelInfo, setCurrentLevel } from "game-engine/extensions/plugins/levelPlugin";
import { PortalObjectPlacement, PortalType } from "@/game/types/placement";
import { openAlert } from "@/game/redux/features/alertSlice";

class Portal extends TileObject {
    store: AppStore;
    portalType: PortalType;
    constructor(params: CreateCustomObjectParams) {
        super(params.placement);
        const gridSize = GridHelper.getGridSizeInPixel();
        this.store = params.reduxStore;
        this.bound = new Rectangle(this.position.x + gridSize / 4, this.position.y, gridSize / 2, gridSize); // only cover the center part of the item
        this.portalType = (params.placement as PortalObjectPlacement).portalType;
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(PortalComponent, { portalType: this.portalType });
    }

    private changeLevel() {
        const levelState = this.store.getState().level;
        const { currentLevel, allLevelInfo } = levelState;
        const currentLevelInfo = allLevelInfo[currentLevel];

        const portalKey = this.portalType === "prev" ? "prevLevel" : this.portalType === "next" ? "nextLevel" : null;

        if (!portalKey) throw new Error(`Unknown portalType ${this.portalType}`);

        const newLevel = currentLevelInfo[portalKey];

        if (typeof newLevel === "undefined") {
            this.store.dispatch(
                openAlert({
                    type: "error",
                    content: `Level: ${currentLevelInfo.levelTitle}'s ${this.portalType} level is not defined`,
                    ttl: 4000,
                })
            );
            return;
        }

        if (!(newLevel in allLevelInfo)) {
            this.store.dispatch(
                openAlert({
                    type: "error",
                    content: `Level: ${currentLevelInfo.levelTitle}'s ${this.portalType} level ${newLevel} is not in AllLevelInfo`,
                    ttl: 4000,
                })
            );
            return;
        }

        this.store.dispatch(setCurrentLevel(newLevel));
    }

    override performCollisionLogic(object: GameObject): void {
        this.changeLevel();
    }
}

export default Portal;
