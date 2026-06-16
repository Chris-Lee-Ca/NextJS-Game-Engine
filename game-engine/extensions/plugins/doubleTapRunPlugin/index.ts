export type { DoubleTapRunHandlerConfig } from "./DoubleTapRunHandler";
export { DoubleTapRunHandler } from "./DoubleTapRunHandler";
export { runReducer, setIsRunning, runSlice } from "./runSlice";
export { DOUBLE_TAP_RUN_PLUGIN_ID, DOUBLE_TAP_WINDOW_MS, MIN_TAP_DURATION_MS, MAX_TAP_DURATION_MS } from "./constants";
export { createInitialState, onKeyDown, onKeyUp } from "./doubleTapLogic";
