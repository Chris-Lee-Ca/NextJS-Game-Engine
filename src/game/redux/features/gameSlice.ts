import { demoLevel } from "@/game/lib/level";
import { LevelInfo } from "@/game/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface GameStateInterface {
    currentLevel: string;
    allLevelInfo: { [key: string]: LevelInfo };
}

const initialState: GameStateInterface = {
    currentLevel: "demo",
    allLevelInfo: { demo: demoLevel },
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setCurrentLevel: (state, action: PayloadAction<string>) => {
            state.currentLevel = action.payload;
        },
    },
});
export const selectCurrentLevelInfo = (state: RootState): LevelInfo => {
    const currentLevel = state.game.currentLevel;
    return state.game.allLevelInfo[currentLevel];
};

export const { setCurrentLevel } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
