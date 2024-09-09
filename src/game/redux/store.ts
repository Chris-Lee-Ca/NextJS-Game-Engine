import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameEngineReducer } from "@/gameEngine/redux/store";
import { gameReducer } from "./features/gameSlice";

const rootReducer = combineReducers({
    ...gameEngineReducer,
    game: gameReducer,
});

export const makeGameStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeGameStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
