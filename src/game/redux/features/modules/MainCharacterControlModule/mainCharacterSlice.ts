import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Direction, Position } from "@/game/types/general";
import CharacterMovementHelper from "@/game/lib/helper/CharacterMovementHelper";
import { Facing } from "./types";

export interface MainCharacterStateInterface {
    mainCharacterGridPosition: Position;
    mainCharacterPixelPosition: Position;
    facing: Facing;
}

const initialState: MainCharacterStateInterface = {
    mainCharacterGridPosition: { x: 0, y: 0 },
    mainCharacterPixelPosition: { x: 0, y: 0 },
    facing: "none",
};

export const mainCharacterSlice = createSlice({
    name: "mainCharacter",
    initialState,
    reducers: {
        setMainCharacterGridPosition: (state, action: PayloadAction<Direction>) => {
            state.mainCharacterGridPosition = action.payload;
        },
        setMainCharacterPixelPosition: (state, action: PayloadAction<Direction>) => {
            state.mainCharacterPixelPosition = action.payload;
        },
        setFacing: (state, action: PayloadAction<Facing>) => {
            state.facing = action.payload;
        },
    },
});

export const { setMainCharacterGridPosition, setMainCharacterPixelPosition, setFacing } = mainCharacterSlice.actions;
export const mainCharacterReducer = mainCharacterSlice.reducer;
