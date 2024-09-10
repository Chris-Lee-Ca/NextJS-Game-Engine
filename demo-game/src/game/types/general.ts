import { Placement } from "game-engine/types/general";

interface CustomPlacement extends Placement {
    type: "character" | "enemy" | "pickUp" | "tile";
}

export type { CustomPlacement };
