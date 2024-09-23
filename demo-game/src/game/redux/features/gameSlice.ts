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
    reducers: {},
});

export const {} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
