import { CreateObjectParams } from "game-engine/components/GameObjectFactory";
import { Placement } from "game-engine/types/general";
import { AppStore } from "../redux/store";
import { LevelInfo } from "game-engine/extensions/plugins/levelPlugin";

type CustomPlacementType = "Character" | "Enemy" | "PickUp" | "Tile";

type PickUpTypeItem = "resume";

interface CustomPlacement extends Placement {
    type: CustomPlacementType;
}

interface CreateCustomObjectParams extends CreateObjectParams {
    placement: CustomPlacement;
    reduxStore: AppStore;
}

interface PreviewObjectPlacement extends CustomPlacement {
    previewObjectItem: PreviewObjectItem;
}

interface PreviewObjectItem {
    id: string;
    avatar: any;
    type: CustomPlacementType;
    objectItemName: string;
    [key: string]: string;
}

interface SignageObjectPlacement extends CustomPlacement {
    signageType: string;
}

type EditModeLevelInfo = Omit<LevelInfo, "placements"> & {
    placements: (Placement | PreviewObjectPlacement)[];
};

export type {
    CustomPlacementType,
    PickUpTypeItem,
    CustomPlacement,
    CreateCustomObjectParams,
    PreviewObjectPlacement,
    PreviewObjectItem,
    SignageObjectPlacement,
    EditModeLevelInfo,
};
