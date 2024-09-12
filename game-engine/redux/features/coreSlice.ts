import { createSlice } from "@reduxjs/toolkit";

export interface CoreStateInterface {
    time: number;
}

const initialState: CoreStateInterface = {
    time: Date.now(),
};

export const coreSlice = createSlice({
    name: "core",
    initialState,
    reducers: {
        updateTime: (state) => {
            state.time = Date.now();
        },
    },
});

export const { updateTime } = coreSlice.actions;
export const coreReducer = coreSlice.reducer;
