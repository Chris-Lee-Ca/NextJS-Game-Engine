// Tracks the state of the most recent tap for a single key.
// Only one key is tracked at a time; a new keyDown resets this to the latest key.
export interface DoubleTapState {
    key: string;
    keyDownTime: number;
    keyUpTime: number; // timestamp of a valid tap-release; -1 means no eligible release yet
}

// Returned by onKeyDown so the caller can react to a double-tap being detected.
export interface KeyDownResult {
    nextState: DoubleTapState;
    triggered: boolean;
}
