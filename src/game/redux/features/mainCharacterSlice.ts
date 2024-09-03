import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Direction, Position } from "@/game/types/general";
import CharacterMovementHelper from "@/game/lib/helper/CharacterMovementHelper";

export interface MainCharacterStateInterface {
    mainCharacterPosition: Position;
}

const initialState: MainCharacterStateInterface = {
    mainCharacterPosition: { x: 0, y: 0 },
};

export const mainCharacterSlice = createSlice({
    name: "mainCharacter",
    initialState,
    reducers: {
        setMainCharacterPosition: (state, action: PayloadAction<Direction>) => {
            const oldMainCharacterPosition = state.mainCharacterPosition;
            const movementDirection = action.payload;
            const characterMovment = CharacterMovementHelper.getCharacterMovementInPixels(movementDirection);
            const newMainCharacterPosition = {
                x: oldMainCharacterPosition.x + characterMovment.x,
                y: oldMainCharacterPosition.y + characterMovment.y,
            };
            console.log(newMainCharacterPosition);
            state.mainCharacterPosition = newMainCharacterPosition;
        },
    },
});

export const { setMainCharacterPosition } = mainCharacterSlice.actions;
export const mainCharacterReducer = mainCharacterSlice.reducer;
