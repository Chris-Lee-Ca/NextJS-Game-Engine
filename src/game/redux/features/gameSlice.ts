import { demoLevel } from "@/game/lib/level";
import { LevelInfo } from "@/gameEngine/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface GameStateInterface {}

const initialState: GameStateInterface = {};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {},
});

export const {} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
