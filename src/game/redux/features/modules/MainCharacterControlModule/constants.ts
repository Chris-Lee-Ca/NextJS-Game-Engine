import { Direction } from "@/game/types/general";
import { DirectionCommand } from "./types";

export const DIRECTION_KEYS: DirectionCommand[] = ["up", "down", "left", "right"];

export const DIRECTION_COMMAND_MAPPING: { [key in DirectionCommand]: Direction } = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    "": { x: 0, y: 0 },
};
