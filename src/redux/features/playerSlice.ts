import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PlayerStateInterface {
    playerKeyboardEvent: string;
}

const initialState: PlayerStateInterface = {
    playerKeyboardEvent: "",
};

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setPlayerKeyboardEvent: (state, action: PayloadAction<string>) => {
            state.playerKeyboardEvent = action.payload;
        },
        clearPlayerKeyboardEvent: (state, _action: PayloadAction<string>) => {
            state.playerKeyboardEvent = "";
        },
    },
});

export const { setPlayerKeyboardEvent, clearPlayerKeyboardEvent } =
    playerSlice.actions;
export const playerReducer = playerSlice.reducer;
