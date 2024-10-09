import { CreateCustomObjectParams } from "@/game/types/general";
import TileObject from "../TileObject";
import PortalComponent from "./PortalComponent";
import React from "react";
import GameObject from "game-engine/components/GameObject";
import { AppStore } from "@/game/redux/store";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import { setCurrentLevel } from "game-engine/extensions/plugins/levelPlugin";
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

    private getNewLevel(currentLevel: string): string {
        let newLevel = "";
        if (this.portalType === "prev") {
            newLevel = String(Number(currentLevel) + 1);
        } else if (this.portalType === "next") {
            newLevel = String(Number(currentLevel) - 1);
        } else {
            const portalType: never = this.portalType;
            throw new Error(`Unknown portalType ${portalType}`);
        }
        return newLevel;
    }

    private changeLevel() {
        const levelState = this.store.getState().level;
        const { currentLevel, allLevelInfo } = levelState;
        const newLevel = this.getNewLevel(currentLevel);

        if (!(newLevel in allLevelInfo)) {
            this.store.dispatch(
                openAlert({
                    type: "error",
                    content: `New Level: ${newLevel} is not defined in all level info`,
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
