import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AllLevelInfo, LevelInfo } from "./types";
import { LEVEL_PLUGIN_ID } from "./constants";
import { coreReducer } from "../../../redux/features/coreSlice";

export interface LevelStateInterface {
    currentLevel: string;
    allLevelInfo: AllLevelInfo;
    isTransitioning: boolean;
}

const initialState: LevelStateInterface = {
    currentLevel: "",
    allLevelInfo: {},
    isTransitioning: false,
};

export const levelSlice = createSlice({
    name: "level",
    initialState,
    reducers: {
        setCurrentLevel: (state, action: PayloadAction<string>) => {
            // Guarded so the initial bootstrap dispatch (currentLevel: "" -> first level) doesn't
            // flash a transition — only an actual change away from a real level counts.
            if (state.currentLevel && state.currentLevel !== action.payload) {
                state.isTransitioning = true;
            }
            state.currentLevel = action.payload;
        },
        endLevelTransition: (state) => {
            state.isTransitioning = false;
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

export const updateCurrentLevelInfo = (levelInfo: LevelInfo) => (dispatch: AppDispatch) => {
    dispatch(setLevelInfoByKey({ key: levelInfo.levelTitle, levelInfo: levelInfo }));
    dispatch(setCurrentLevel(levelInfo.levelTitle));
};

export const { setCurrentLevel, endLevelTransition, setAllLevelInfo, setLevelInfoByKey } = levelSlice.actions;
export const levelReducer = levelSlice.reducer;

const makeStore = () => {
    return configureStore({
        reducer: {
            core: coreReducer,
            [LEVEL_PLUGIN_ID]: levelReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
