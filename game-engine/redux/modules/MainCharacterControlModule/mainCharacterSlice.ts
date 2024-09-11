import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Coordinate, Vector2 } from "../../../types/general";
import { Facing } from "./types";

export interface MainCharacterStateInterface {
    mainCharacterMovingSpeed: number;
    mainCharacterGridPosition: Coordinate;
    mainCharacterPixelPosition: Vector2;
    facing: Facing;
}

const initialState: MainCharacterStateInterface = {
    mainCharacterMovingSpeed: 10,
    mainCharacterGridPosition: { x: 0, y: 0 },
    mainCharacterPixelPosition: { x: 0, y: 0 },
    facing: "none",
};

export const mainCharacterSlice = createSlice({
    name: "mainCharacter",
    initialState,
    reducers: {
        setMainCharacterMovingSpeed: (state, action: PayloadAction<number>) => {
            state.mainCharacterMovingSpeed = action.payload;
        },
        setMainCharacterGridPosition: (state, action: PayloadAction<Coordinate>) => {
            state.mainCharacterGridPosition = action.payload;
        },
        setMainCharacterPixelPosition: (state, action: PayloadAction<Vector2>) => {
            state.mainCharacterPixelPosition = action.payload;
        },
        setFacing: (state, action: PayloadAction<Facing>) => {
            state.facing = action.payload;
        },
    },
});

export const { setMainCharacterMovingSpeed, setMainCharacterGridPosition, setMainCharacterPixelPosition, setFacing } =
    mainCharacterSlice.actions;
export const mainCharacterReducer = mainCharacterSlice.reducer;
