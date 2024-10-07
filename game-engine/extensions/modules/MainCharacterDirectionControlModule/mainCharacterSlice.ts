import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { DirectionCommand } from "./types";
import { KEYBOARD_EVENT_PLUGIN_ID, keyboardEventReducer } from "../../plugins/keyboardEventPlugin";
import { MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID } from "./constants";

export interface MainCharacterStateInterface {
    disabled: boolean;
    movementDirection: DirectionCommand;
}

const initialState: MainCharacterStateInterface = {
    disabled: false,
    movementDirection: "",
};

export const mainCharacterDirectionSlice = createSlice({
    name: "mainCharacter",
    initialState,
    reducers: {
        setIsDisabledMainCharacterControl: (state, action: PayloadAction<boolean>) => {
            state.disabled = action.payload;
        },
        setMovmentDirection: (state, action: PayloadAction<DirectionCommand>) => {
            state.movementDirection = action.payload;
        },
    },
});

export const { setIsDisabledMainCharacterControl, setMovmentDirection } = mainCharacterDirectionSlice.actions;
export const mainCharacterDirectionReducer = mainCharacterDirectionSlice.reducer;

const makeStore = () => {
    return configureStore({
        reducer: {
            [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
            [MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID]: mainCharacterDirectionReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
