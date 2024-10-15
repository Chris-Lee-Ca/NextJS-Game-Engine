import { Placement } from "game-engine/types/general";
import { PreviewObjectItem } from "./general";
import { Facing } from "game-engine/extensions/modules/MainCharacterDirectionControlModule";

type CustomPlacementType = "Character" | "Enemy" | "PickUp" | "Tile";
type PortalType = "prev" | "next";
type RoadType = "straight" | "dead-end" | "t-junction" | "turn" | "x-junction";

interface CustomPlacement extends Placement {
    type: CustomPlacementType;
}

interface PreviewObjectPlacement extends CustomPlacement {
    previewObjectItem: PreviewObjectItem;
}

interface SignageObjectPlacement extends CustomPlacement {
    signageType: string;
}

interface PortalObjectPlacement extends CustomPlacement {
    portalType: PortalType;
}

interface CompanyObjectPlacement extends CustomPlacement {
    companyType: string;
}

interface PaintingObjectPlacement extends CustomPlacement {
    paintingType: string;
}

interface RoadObjectPlacement extends CustomPlacement {
    roadType: RoadType;
    facing: Facing;
}

export type {
    CustomPlacementType,
    PortalType,
    RoadType,
    CustomPlacement,
    PreviewObjectPlacement,
    SignageObjectPlacement,
    PortalObjectPlacement,
    CompanyObjectPlacement,
    PaintingObjectPlacement,
    RoadObjectPlacement,
};
