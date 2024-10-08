import { KeyboardKey } from "../../plugins/keyboardEventPlugin";

export type DirectionCommand = "up" | "down" | "left" | "right" | "";
export type Facing = "up" | "down" | "left" | "right" | "none";

/**
 * Key: Direction command
 * Value: An array of corresponding keyboard keys associated with the direction command.
 */
export type DirectionKeyMapping = {
    [key in DirectionCommand]?: KeyboardKey[];
};

/**
 * Key: Represents the tracked keyboard keys.
 * Value: The corresponding direction command associated with the key.
 */
export type InvertedDirectionKeyMapping = {
    [key in KeyboardKey]?: DirectionCommand;
};
