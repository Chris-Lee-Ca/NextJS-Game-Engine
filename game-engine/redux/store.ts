import { configureStore } from "@reduxjs/toolkit";
import { levelReducer } from "./modules/levelModule";
import { keyboardEventReducer } from "./modules/keyboardEventModule";
import { mainCharacterReducer } from "./modules/MainCharacterControlModule";
import { coreReducer } from "./features/coreSlice";

// TODO:  Make this gameEngineReducer able to cherry-pick the modules used in the game.
export const gameEngineReducer = {
    core: coreReducer,
    level: levelReducer,
    keyboardControl: keyboardEventReducer,
    mainCharacter: mainCharacterReducer,
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
