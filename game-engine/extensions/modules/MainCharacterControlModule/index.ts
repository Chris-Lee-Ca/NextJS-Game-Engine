/**
 * Main Character Control Module manages all interactions related to the main character.
 *
 * This module encompasses both direction and action controls.
 *
 * It relies on information provided by the `KeyboardEventModule`. Please ensure that the `KeyboardEventModule` is activated for this module to function correctly.
 *
 * @packageDocumentation
 */
export type { DirectionControlHandlerConfig,  } from "./DirectionControlHandler";
export type { DirectionCommand, Facing } from "./types";
export { MAIN_CHARACTER_CONTROL_MODULE_ID, DEFAULT_DIRECTION_KEY_MAPPING } from "./constants";
export { DirectionControlHandler } from "./DirectionControlHandler";
export { mainCharacterReducer, setIsDisabledMainCharacterControl } from "./mainCharacterSlice";
export { getCharacterOffset } from "./helper";
