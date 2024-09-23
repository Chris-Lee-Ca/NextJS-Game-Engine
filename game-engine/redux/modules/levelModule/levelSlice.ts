import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { AllLevelInfo, LevelInfo } from "./types";

export interface LevelStateInterface {
    currentLevel: string;
    allLevelInfo: AllLevelInfo;
    objectIdPool: string[]; // An array storing all IDs of object pool object.
}

const initialState: LevelStateInterface = {
    currentLevel: "",
    allLevelInfo: {},
    objectIdPool: [],
};

export const levelSlice = createSlice({
    name: "level",
    initialState,
    reducers: {
        setCurrentLevel: (state, action: PayloadAction<string>) => {
            state.currentLevel = action.payload;
        },
        setAllLevelInfo: (state, action: PayloadAction<AllLevelInfo>) => {
            state.allLevelInfo = action.payload;
        },
        setLevelInfoByKey: (state, action: PayloadAction<{ key: string; levelInfo: LevelInfo }>) => {
            state.allLevelInfo[action.payload.key] = action.payload.levelInfo;
        },
        setObjectIdPool: (state, action: PayloadAction<string[]>) => {
            state.objectIdPool = action.payload;
        },
    },
});

export const selectCurrentLevelInfo = (state: RootState): LevelInfo => {
    const currentLevel = state.level.currentLevel;
    return state.level.allLevelInfo[currentLevel];
};

export const { setCurrentLevel, setAllLevelInfo, setLevelInfoByKey, setObjectIdPool } = levelSlice.actions;
export const levelReducer = levelSlice.reducer;
