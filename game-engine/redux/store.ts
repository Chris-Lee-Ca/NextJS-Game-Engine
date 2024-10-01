import { configureStore } from "@reduxjs/toolkit";
import { coreReducer } from "./features/coreSlice";

export const gameEngineReducer = {
    core: coreReducer,
};

export const makeGameEngineStore = () => {
    return configureStore({
        reducer: gameEngineReducer,
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeGameEngineStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
