import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface KeyboardEventStateInterface {
    heldKeys: string[];
}

const initialState: KeyboardEventStateInterface = {
    heldKeys: [],
};

export const keyboardEventSlice = createSlice({
    name: "keyboardEvent",
    initialState,
    reducers: {
        setHeldKeys: (state, action: PayloadAction<string[]>) => {
            state.heldKeys = [...action.payload];
        },
    },
});

export const { setHeldKeys } = keyboardEventSlice.actions;
export const keyboardEventReducer = keyboardEventSlice.reducer;
