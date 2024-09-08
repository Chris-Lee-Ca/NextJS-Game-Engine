import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LevelStateInterface {
    objectIdPool: string[];
}

const initialState: LevelStateInterface = {
    objectIdPool: [],
};

export const levelSlice = createSlice({
    name: "level",
    initialState,
    reducers: {
        setObjectPool: (state, action: PayloadAction<string[]>) => {
            state.objectIdPool = action.payload;
        },
    },
});

export const { setObjectPool } = levelSlice.actions;
export const levelReducer = levelSlice.reducer;
