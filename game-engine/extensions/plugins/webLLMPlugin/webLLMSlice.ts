import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WEB_LLM_PLUGIN_ID } from "./constants";

export interface WebLLMStateInterface {
    isLoading: boolean;
    loadingProgress: number;
    isReady: boolean;
    error: string | null;
}

const initialState: WebLLMStateInterface = {
    isLoading: false,
    loadingProgress: 0,
    isReady: false,
    error: null,
};

export const webLLMSlice = createSlice({
    name: WEB_LLM_PLUGIN_ID,
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setLoadingProgress: (state, action: PayloadAction<number>) => {
            state.loadingProgress = action.payload;
        },
        setIsReady: (state, action: PayloadAction<boolean>) => {
            state.isReady = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setIsLoading, setLoadingProgress, setIsReady, setError } = webLLMSlice.actions;
export const webLLMReducer = webLLMSlice.reducer;
