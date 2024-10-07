/**
 * Main Character Action Control Module manages all action key interactions related to the main character.
 *
 * It relies on information provided by the `KeyboardEventModule`. Please ensure that the `KeyboardEventModule` is activated for this module to function correctly.
 *
 * @packageDocumentation
 */
export type { ActionControlHandlerConfig } from "./ActionControlHandler";
export type { ActionKeyMapping } from "./types";
export {ActionControlHandler} from "./ActionControlHandler";
export { MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID } from "./constants";
export { mainCharacterActionReducer, setIsDisabledMainCharacterActionControl } from "./mainCharacterActionSlice";
