import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./features/gameSlice";
import { levelReducer } from "./features/modules/levelModule";
import { keyboardEventReducer } from "./features/modules/keyboardEventModule";
import { mainCharacterReducer } from "./features/modules/MainCharacterControlModule";

export const makeGameStore = () => {
    return configureStore({
        reducer: {
            game: gameReducer,
            level: levelReducer,
            keyboardControl: keyboardEventReducer,
            mainCharacter: mainCharacterReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeGameStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
