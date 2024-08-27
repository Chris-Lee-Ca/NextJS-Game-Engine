import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Direction } from "@/game/types/general";

export interface MainCharacterStateInterface {
    mainCharacterPosition: Direction;
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
            const newDirection = action.payload;
            const newMainCharacterPosition = {
                x: oldMainCharacterPosition.x + newDirection.x,
                y: oldMainCharacterPosition.y + newDirection.y,
            };
            state.mainCharacterPosition = newMainCharacterPosition;
        },
    },
});

export const { setMainCharacterPosition } = mainCharacterSlice.actions;
export const mainCharacterReducer = mainCharacterSlice.reducer;
