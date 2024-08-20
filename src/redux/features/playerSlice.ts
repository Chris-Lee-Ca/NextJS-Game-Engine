import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Direction } from "@/lib/types";

export interface PlayerStateInterface {
    playerPosition: Direction;
}

const initialState: PlayerStateInterface = {
    playerPosition: { x: 0, y: 0 },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerPosition: (state, action: PayloadAction<Direction>) => {
        const oldPlayerPosition = state.playerPosition;
        const newDirection = action.payload;
        const newPlayerPosition = {
            x: oldPlayerPosition.x + newDirection.x,
            y: oldPlayerPosition.y + newDirection.y,
        };
      state.playerPosition = newPlayerPosition;
    },
  },
});

export const { setPlayerPosition } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
