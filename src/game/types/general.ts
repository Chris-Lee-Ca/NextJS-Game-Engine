import { Placement } from "@/gameEngine/types/general";

interface CustomPlacement extends Placement {
    type: "character" | "enemy" | "pickUp" | "tile";
}

export type { CustomPlacement };
