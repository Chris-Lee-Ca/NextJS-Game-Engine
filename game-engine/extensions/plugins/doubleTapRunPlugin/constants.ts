export const DOUBLE_TAP_RUN_PLUGIN_ID = "double-tap-run";

// Max time (ms) between the first key-up and second key-down to count as a double-tap.
export const DOUBLE_TAP_WINDOW_MS = 300;

// A key-up is only recorded as a valid "first tap" if the hold duration falls in this range.
// Too short = likely a phantom/repeat event; too long = the user was holding, not tapping.
export const MIN_TAP_DURATION_MS = 30;
export const MAX_TAP_DURATION_MS = 250;

// On mobile, users may briefly lift one finger before placing the next on a direction button.
// This window keeps run active during that finger-swap gap.
export const MOBILE_GRACE_PERIOD_MS = 400;

// Direction keys that participate in double-tap detection (WASD + arrow keys).
export const DEFAULT_DIRECTION_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"]);
