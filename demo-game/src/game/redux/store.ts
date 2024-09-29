import { gameEngineReducer } from "game-engine/redux/store";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./features/gameSlice";
import { editModeReducer } from "./features/editModeSlice";

const rootReducer = combineReducers({
    ...gameEngineReducer,
    game: gameReducer,
    editMode: editModeReducer,
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
