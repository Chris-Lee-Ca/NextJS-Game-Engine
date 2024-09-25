import { CreateObjectParams } from "game-engine/components/GameObjectFactory";
import { Placement } from "game-engine/types/general";
import { AppStore } from "../redux/store";

type CustomPlacementType = "character" | "enemy" | "pickUp" | "tile";

interface CustomPlacement extends Placement {
    type: CustomPlacementType;
}

interface CreateCustomObjectParams extends CreateObjectParams {
    placement: CustomPlacement;
    reduxStore: AppStore;
}

export type { CustomPlacementType, CustomPlacement, CreateCustomObjectParams };
