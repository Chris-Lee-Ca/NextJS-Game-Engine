import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./features/playerSlice";
import { gameReducer } from "./features/gameSlice";
import { keyboardEventReducer } from "./features/modules/keyboardEventModule";
import { mainCharacterReducer } from "./features/modules/MainCharacterControlModule";

export const makeGameStore = () => {
    return configureStore({
        reducer: {
            game: gameReducer,
            player: playerReducer,
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
