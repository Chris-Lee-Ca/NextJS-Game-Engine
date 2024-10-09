import { Placement } from "game-engine/types/general";
import { PreviewObjectItem } from "./general";

type CustomPlacementType = "Character" | "Enemy" | "PickUp" | "Tile";
type PortalType = "prev" | "next";

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

export type {
    CustomPlacementType,
    PortalType,
    CustomPlacement,
    PreviewObjectPlacement,
    SignageObjectPlacement,
    PortalObjectPlacement,
    CompanyObjectPlacement,
    PaintingObjectPlacement,
};
