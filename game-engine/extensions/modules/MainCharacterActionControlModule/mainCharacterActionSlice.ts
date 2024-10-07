import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { KEYBOARD_EVENT_PLUGIN_ID, keyboardEventReducer } from "../../plugins/keyboardEventPlugin";
import { MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID } from "./constants";

export interface MainCharacterActionStateInterface {
    disabled: boolean;
    heldActionKeys: string[];
}

const initialState: MainCharacterActionStateInterface = {
    disabled: false,
    heldActionKeys: [],
};

export const mainCharacterActionSlice = createSlice({
    name: "mainCharacter",
    initialState,
    reducers: {
        setIsDisabledMainCharacterActionControl: (state, action: PayloadAction<boolean>) => {
            state.disabled = action.payload;
        },
        setHeldActionKeys: (state, action: PayloadAction<string[]>) => {
            state.heldActionKeys = action.payload;
        },
    },
});

export const { setIsDisabledMainCharacterActionControl, setHeldActionKeys } = mainCharacterActionSlice.actions;
export const mainCharacterActionReducer = mainCharacterActionSlice.reducer;

const makeStore = () => {
    return configureStore({
        reducer: {
            [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
            [MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID]: mainCharacterActionReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
