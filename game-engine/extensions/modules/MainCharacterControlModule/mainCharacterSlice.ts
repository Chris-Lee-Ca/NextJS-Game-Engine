import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { DirectionCommand } from "./types";
import { KEYBOARD_EVENT_PLUGIN_ID, keyboardEventReducer } from "../../plugins/keyboardEventPlugin";
import { MAIN_CHARACTER_CONTROL_MODULE_ID } from "./constants";

export interface MainCharacterStateInterface {
    movementDirection: DirectionCommand;
}

const initialState: MainCharacterStateInterface = {
    movementDirection: "",
};

export const mainCharacterSlice = createSlice({
    name: "mainCharacter",
    initialState,
    reducers: {
        setMovmentDirection: (state, action: PayloadAction<DirectionCommand>) => {
            state.movementDirection = action.payload;
        },
    },
});

export const { setMovmentDirection } = mainCharacterSlice.actions;
export const mainCharacterReducer = mainCharacterSlice.reducer;

const makeStore = () => {
    return configureStore({
        reducer: {
            [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
            [MAIN_CHARACTER_CONTROL_MODULE_ID]: mainCharacterReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
