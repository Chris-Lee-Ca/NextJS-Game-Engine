import { DOUBLE_TAP_WINDOW_MS, MIN_TAP_DURATION_MS, MAX_TAP_DURATION_MS } from "./constants";
import { DoubleTapState, KeyDownResult } from "./types";

export const createInitialState = (): DoubleTapState => ({
    key: "",
    keyDownTime: 0,
    keyUpTime: -1, // -1 = no valid first tap recorded yet
});

// Checks whether this keyDown completes a double-tap and always resets state to track the new press.
// `triggered` is true only when: same key, first tap was validly released (keyUpTime >= 0),
// and the gap between that release and this press is within DOUBLE_TAP_WINDOW_MS.
export function onKeyDown(state: DoubleTapState, key: string, now: number): KeyDownResult {
    const triggered =
        state.key === key &&
        state.keyUpTime >= 0 &&
        now - state.keyUpTime < DOUBLE_TAP_WINDOW_MS;

    return {
        nextState: { key, keyDownTime: now, keyUpTime: -1 },
        triggered,
    };
}

// Records the release time only when the hold duration is in the valid tap range.
// Too short: likely a phantom/repeat event. Too long: user was holding, not tapping.
// An invalid release leaves keyUpTime at -1 so the next keyDown cannot trigger.
export function onKeyUp(state: DoubleTapState, key: string, now: number): DoubleTapState {
    if (state.key !== key) return state;
    const holdDuration = now - state.keyDownTime;
    if (holdDuration >= MIN_TAP_DURATION_MS && holdDuration <= MAX_TAP_DURATION_MS) {
        return { ...state, keyUpTime: now };
    }
    return state;
}
