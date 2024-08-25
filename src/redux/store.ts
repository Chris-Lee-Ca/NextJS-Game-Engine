import { configureStore } from "@reduxjs/toolkit";
import { playerReducer } from "./features/playerSlice";
import { mainCharacterReducer } from "./features/mainCharacterSlice";
import { gameReducer } from "./features/gameSlice";

export const makeGameStore = () => {
    return configureStore({
        reducer: {
            game: gameReducer,
            mainCharacter: mainCharacterReducer,
            player: playerReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeGameStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
