import { CreateObjectParams } from "game-engine/components/GameObjectFactory";
import { AppStore } from "../redux/store";
import { CustomPlacement, CustomPlacementType } from "./placement";

type PickUpTypeItem = "resume";
type Avatar = { type: "text" | "ReactNode"; interface: any };

interface CreateCustomObjectParams extends CreateObjectParams {
    placement: CustomPlacement;
    reduxStore: AppStore;
}

interface PreviewObjectItem {
    id: string;
    avatar: Avatar | undefined;
    type: CustomPlacementType;
    objectItemName: string;
    customProperties?: Record<string, string>;
}

export type { PickUpTypeItem, Avatar, CreateCustomObjectParams, PreviewObjectItem };
