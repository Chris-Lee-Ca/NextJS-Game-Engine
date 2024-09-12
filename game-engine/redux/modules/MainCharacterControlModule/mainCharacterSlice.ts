import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Offset } from "../../../types/general";
import { DirectionCommand, Facing } from "./types";

export interface MainCharacterStateInterface {
    movmentDirection: DirectionCommand;
}

const initialState: MainCharacterStateInterface = {
    movmentDirection: "",
};

export const mainCharacterSlice = createSlice({
    name: "mainCharacter",
    initialState,
    reducers: {
        setMovmentDirection: (state, action: PayloadAction<DirectionCommand>) => {
            state.movmentDirection = action.payload;
        },
    },
});

export const { setMovmentDirection } = mainCharacterSlice.actions;
export const mainCharacterReducer = mainCharacterSlice.reducer;
