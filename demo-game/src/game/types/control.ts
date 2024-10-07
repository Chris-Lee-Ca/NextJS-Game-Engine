import { KeyboardKey } from "game-engine/extensions/plugins/keyboardEventPlugin";

export type ActionCommandType = "k" | "l";

export type CustomActionKeyMapping = {
    [key in ActionCommandType]: KeyboardKey[];
}