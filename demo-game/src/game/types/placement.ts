import { Placement } from "game-engine/types/general";
import { PreviewObjectItem } from "./general";

type CustomPlacementType = "Character" | "Enemy" | "PickUp" | "Tile";

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
    portalType: "prev" | "next";
}

export type {
    CustomPlacementType,
    CustomPlacement,
    PreviewObjectPlacement,
    SignageObjectPlacement,
    PortalObjectPlacement,
};
