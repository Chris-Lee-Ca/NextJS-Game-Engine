// Redux slice that holds the run-mode flag.
// DoubleTapRunHandler dispatches setIsRunning; MainCharacter reads isRunning to adjust speed.
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RunState {
    isRunning: boolean;
}

const initialState: RunState = {
    isRunning: false,
};

export const runSlice = createSlice({
    name: "run",
    initialState,
    reducers: {
        setIsRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
        },
    },
});

export const { setIsRunning } = runSlice.actions;
export const runReducer = runSlice.reducer;
