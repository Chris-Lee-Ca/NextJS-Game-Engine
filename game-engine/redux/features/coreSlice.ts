import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CoreStateInterface {
    time: number;
    objectIdPool: string[]; // An array storing all IDs of object pool object.
}

const initialState: CoreStateInterface = {
    time: Date.now(),
    objectIdPool: [],
};

export const coreSlice = createSlice({
    name: "core",
    initialState,
    reducers: {
        updateTime: (state) => {
            state.time = Date.now();
        },
        setObjectIdPool: (state, action: PayloadAction<string[]>) => {
            state.objectIdPool = action.payload;
        },
    },
});

export const { updateTime, setObjectIdPool } = coreSlice.actions;
export const coreReducer = coreSlice.reducer;
