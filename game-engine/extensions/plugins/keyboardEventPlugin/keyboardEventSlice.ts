import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { KEYBOARD_EVENT_PLUGIN_ID } from "./constants";

export interface KeyboardEventStateInterface {
    heldKeys: string[];
}

const initialState: KeyboardEventStateInterface = {
    heldKeys: [],
};

export const keyboardEventSlice = createSlice({
    name: "keyboardEvent",
    initialState,
    reducers: {
        setHeldKeys: (state, action: PayloadAction<string[]>) => {
            state.heldKeys = [...action.payload];
        },
    },
});

export const { setHeldKeys } = keyboardEventSlice.actions;
export const keyboardEventReducer = keyboardEventSlice.reducer;

const makeStore = () => {
    return configureStore({
        reducer: {
            [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
