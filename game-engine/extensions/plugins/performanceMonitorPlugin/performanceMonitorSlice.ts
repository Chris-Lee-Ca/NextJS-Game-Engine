import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PERFORMANCE_MONITOR_PLUGIN_ID } from "./constants";

export interface PerformanceMonitorState {
    visible: boolean;
    fps: number;
}

const initialState: PerformanceMonitorState = {
    visible: true,
    fps: 0,
};

export const performanceMonitorSlice = createSlice({
    name: "performanceMonitor",
    initialState,
    reducers: {
        toggleVisible: (state) => {
            state.visible = !state.visible;
        },
        setStats: (state, action: PayloadAction<{ fps: number }>) => {
            state.fps = action.payload.fps;
        },
    },
});

export const { toggleVisible, setStats } = performanceMonitorSlice.actions;
export const performanceMonitorReducer = performanceMonitorSlice.reducer;

const makeStore = () => {
    return configureStore({
        reducer: {
            [PERFORMANCE_MONITOR_PLUGIN_ID]: performanceMonitorReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
