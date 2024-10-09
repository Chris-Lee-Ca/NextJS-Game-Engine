import { CreateObjectParams } from "game-engine/components/GameObjectFactory";
import { Placement } from "game-engine/types/general";
import { AppStore } from "../redux/store";
import { LevelInfo } from "game-engine/extensions/plugins/levelPlugin";
import { CustomPlacement, CustomPlacementType, PreviewObjectPlacement } from "./placement";

type PickUpTypeItem = "resume";

interface CreateCustomObjectParams extends CreateObjectParams {
    placement: CustomPlacement;
    reduxStore: AppStore;
}

interface PreviewObjectItem {
    id: string;
    avatar: any;
    type: CustomPlacementType;
    objectItemName: string;
    [key: string]: string;
}

type EditModeLevelInfo = Omit<LevelInfo, "placements"> & {
    placements: (Placement | PreviewObjectPlacement)[];
};

export type { PickUpTypeItem, CreateCustomObjectParams, PreviewObjectItem, EditModeLevelInfo };
