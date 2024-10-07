import { Direction } from "../../../types/general";
import { KeyboardKey } from "../../plugins/keyboardEventPlugin";
import { DirectionCommand } from "./types";

export const MAIN_CHARACTER_CONTROL_MODULE_ID = "main-character-control";
export const DIRECTION_KEYS: DirectionCommand[] = ["up", "down", "left", "right"];

export const DEFAULT_DIRECTION_KEY_MAPPING: { [key in DirectionCommand]?: KeyboardKey[] } = {
    up: ['ArrowUp', 'w'],
    down: ['ArrowDown', 's'],
    left: ['ArrowLeft', 'a'],
    right: ['ArrowRight', 'd']
};

export const DIRECTION_COMMAND_MAPPING: { [key in DirectionCommand]: Direction } = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    "": { x: 0, y: 0 },
};
