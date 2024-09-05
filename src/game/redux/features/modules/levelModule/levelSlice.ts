import { GameObject, LevelInfo } from "@/game/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LevelStateInterface {
    objectPool: { [key: string]: GameObject };
}

const initialState: LevelStateInterface = {
    objectPool: {},
};

export const levelSlice = createSlice({
    name: "level",
    initialState,
    reducers: {
        setObjectPool: (state, action: PayloadAction<{ [key: string]: GameObject }>) => {
            state.objectPool = action.payload;
        },
    },
});

export const { setObjectPool } = levelSlice.actions;
export const levelReducer = levelSlice.reducer;
