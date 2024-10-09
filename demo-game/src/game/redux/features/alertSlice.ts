import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertType = "success" | "warning" | "error" | "info";

export interface AlertStateInterface {
    isOpenAlertWindow: boolean;
    type: AlertType;
    content: string;
    ttl: number; //time to live in millisecond
}

const initialState: AlertStateInterface = {
    isOpenAlertWindow: false,
    type: "info",
    content: "",
    ttl: 0,
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        openAlert: (state, action: PayloadAction<{ type: AlertType; content: string; ttl: number }>) => {
            state.isOpenAlertWindow = true;
            state.type = action.payload.type;
            state.content = action.payload.content;
            state.ttl = action.payload.ttl;
        },
        closeAlert: (state) => {
            state.isOpenAlertWindow = false;
        },
    },
});
export const { openAlert, closeAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
