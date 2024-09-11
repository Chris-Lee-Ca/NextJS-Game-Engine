import { CreateObjectParams } from "game-engine/components/GameObjectFactory";
import { Placement } from "game-engine/types/general";
import { AppStore } from "../redux/store";

interface CustomPlacement extends Placement {
    type: "character" | "enemy" | "pickUp" | "tile";
}

interface CreateCustomObjectParams extends CreateObjectParams {
    placement: CustomPlacement;
    reduxStore: AppStore;
}

export type { CustomPlacement, CreateCustomObjectParams };
