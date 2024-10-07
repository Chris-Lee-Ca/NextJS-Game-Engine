import { KeyboardKey } from "../../plugins/keyboardEventPlugin"

/**
 * Key: Game command or Action 
 * Value: An array of corresponding keyboard keys associated with the game command.
 */
export type ActionKeyMapping = {
    [key : string]: KeyboardKey[]
}

/**
 * Key: Represents the tracked keyboard keys.
 * Value: The corresponding game command or action associated with the key.
 */
export type InvertedActionKeyMapping = {
    [key in KeyboardKey]?: string
}