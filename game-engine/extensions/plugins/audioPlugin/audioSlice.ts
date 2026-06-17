import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AUDIO_PLUGIN_ID } from "./constants";

export interface AudioState {
    masterVolume: number;
    muted: boolean;
}

const initialState: AudioState = {
    masterVolume: 0.7,
    muted: false,
};

export const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setMasterVolume: (state, action: PayloadAction<number>) => {
            state.masterVolume = Math.max(0, Math.min(1, action.payload));
        },
        setMuted: (state, action: PayloadAction<boolean>) => {
            state.muted = action.payload;
        },
    },
});

export const { setMasterVolume, setMuted } = audioSlice.actions;
export const audioReducer = audioSlice.reducer;

const makeStore = () => {
    return configureStore({
        reducer: {
            [AUDIO_PLUGIN_ID]: audioReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
