import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GameStateInterface {
    devMode: boolean;
    editMode: boolean;
}

const initialState: GameStateInterface = {
    devMode: false,
    editMode: false,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        updateDevMode: (state, action: PayloadAction<boolean>) => {
            state.devMode = action.payload;
        },
        updateEditMode: (state, action: PayloadAction<boolean>) => {
            state.editMode = action.payload;
        },
    },
});

export const { updateDevMode, updateEditMode } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
