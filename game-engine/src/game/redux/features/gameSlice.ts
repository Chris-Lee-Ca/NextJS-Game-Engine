import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GameStateInterface {}

const initialState: GameStateInterface = {};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {},
});

export const {} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
