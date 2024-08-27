import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GameStateInterface {
    level: string;
}

const initialState: GameStateInterface = {
    level: "1",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setGameLevel: (state, action: PayloadAction<string>) => {
            state.level = action.payload;
        },
    },
});

export const { setGameLevel } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
