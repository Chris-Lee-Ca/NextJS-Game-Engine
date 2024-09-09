import { demoLevel } from "@/game/lib/level";
import { RootState } from "@/game/redux/store";
import { LevelInfo } from "@/gameEngine/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LevelStateInterface {
    currentLevel: string;
    allLevelInfo: { [key: string]: LevelInfo };
    objectIdPool: string[]; // An array storing all IDs of object pool object.
}

const initialState: LevelStateInterface = {
    currentLevel: "demo",
    allLevelInfo: { demo: demoLevel }, //TODO remove linkage to the game folder
    objectIdPool: [],
};

export const levelSlice = createSlice({
    name: "level",
    initialState,
    reducers: {
        setCurrentLevel: (state, action: PayloadAction<string>) => {
            state.currentLevel = action.payload;
        },
        setObjectPool: (state, action: PayloadAction<string[]>) => {
            state.objectIdPool = action.payload;
        },
    },
});

export const selectCurrentLevelInfo = (state: RootState): LevelInfo => {
    const currentLevel = state.level.currentLevel;
    return state.level.allLevelInfo[currentLevel];
};

export const { setCurrentLevel, setObjectPool } = levelSlice.actions;
export const levelReducer = levelSlice.reducer;
