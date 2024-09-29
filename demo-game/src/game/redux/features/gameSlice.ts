import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GameStateInterface {
    devMode: boolean;
}

const initialState: GameStateInterface = {
    devMode: false,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateDevMode: (state, action: PayloadAction<boolean>) => {
            state.devMode = action.payload;
        },
    },
});

export const { updateDevMode } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
