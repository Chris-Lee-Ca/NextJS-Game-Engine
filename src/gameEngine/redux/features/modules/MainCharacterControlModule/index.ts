/**
 * Main Character Control Module manages all interactions related to the main character.
 *
 * This module encompasses both direction and action controls.
 *
 * It relies on information provided by the `KeyboardEventModule`. Please ensure that the `KeyboardEventModule` is activated for this module to function correctly.
 *
 * @packageDocumentation
 */

export { DirectionControlHandler } from "./DirectionControlHandler";
export { mainCharacterReducer } from "./mainCharacterSlice";
