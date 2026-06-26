/**
 * Level Plugin manages all level related information.
 *
 * @packageDocumentation
 */

export type { LevelHandlerConfig } from "./LevelHandler";
export type { Theme, LevelInfo, AllLevelInfo, LevelTransitionComponent } from "./types";
export type { FadeTransitionOptions } from "./transitions/FadeTransition";
export type { LevelTransitionOverlayProps } from "./components/LevelTransitionOverlay";

export { LEVEL_PLUGIN_ID } from "./constants";
export { LevelHandler } from "./LevelHandler";
export {
    levelReducer,
    selectCurrentLevelInfo,
    setCurrentLevel,
    setAllLevelInfo,
    setLevelInfoByKey,
    updateCurrentLevelInfo,
} from "./levelSlice";
export { CanvasHelper } from "./CanvasHelper";
export { FadeTransition } from "./transitions/FadeTransition";
export { LevelTransitionOverlay } from "./components/LevelTransitionOverlay";
