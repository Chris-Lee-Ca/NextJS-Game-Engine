import { CustomPlacement, CompanyObjectPlacement } from "@/game/types/placement";
import CompanyComponent from "./CompanyComponent";
import React from "react";
import GridHelper from "game-engine/helper/GridHelper";
import Rectangle from "game-engine/components/Rectangle";
import InteractableTileObject from "../InteractableTileObject";

class Company extends InteractableTileObject {
    placement: CompanyObjectPlacement;

    constructor(placement: CustomPlacement) {
        super(placement);
        this.placement = placement as CompanyObjectPlacement;
        const gridSize = GridHelper.getGridSizeInPixel();
        this.bound = new Rectangle(this.position.x, this.position.y, gridSize, gridSize);
    }

    override update(deltaTime: number) {}

    render() {
        return React.createElement(CompanyComponent, {
            isUserNearCompany: this.isUserNearObject,
            companyType: this.placement.companyType,
        });
    }
}

export default Company;
