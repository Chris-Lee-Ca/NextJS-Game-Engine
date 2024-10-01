import { GameCommand } from "./types";

export const KEYBOARD_EVENT_PLUGIN_ID = "keyboard-control";
export const KEY_MAPPING: { [key: string]: GameCommand } = {
    ArrowUp: "up",
    KeyW: "up",
    ArrowDown: "down",
    KeyS: "down",
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right",
};
