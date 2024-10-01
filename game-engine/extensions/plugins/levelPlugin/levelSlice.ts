import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AllLevelInfo, LevelInfo } from "./types";
import { LEVEL_PLUGIN_ID } from "./constants";

export interface LevelStateInterface {
    currentLevel: string;
    allLevelInfo: AllLevelInfo;
}

const initialState: LevelStateInterface = {
    currentLevel: "",
    allLevelInfo: {},
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
    },
});

export const selectCurrentLevelInfo = (state: RootState): LevelInfo => {
    const currentLevel = state[LEVEL_PLUGIN_ID].currentLevel;
    return state.level.allLevelInfo[currentLevel];
};

export const { setCurrentLevel, setAllLevelInfo, setLevelInfoByKey } = levelSlice.actions;
export const levelReducer = levelSlice.reducer;

const makeStore = () => {
    return configureStore({
        reducer: {
            [LEVEL_PLUGIN_ID]: levelReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
