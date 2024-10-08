import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

export type DialogWindowType = "resume" | "finish-line" | null;

export interface DialogStateInterface {
    isOpenDialogWindow: boolean;
    dialogWindowType: DialogWindowType;
}

const initialState: DialogStateInterface = {
    isOpenDialogWindow: false,
    dialogWindowType: null,
};

export const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        updateIsOpenDialogWindow: (state, action: PayloadAction<boolean>) => {
            state.isOpenDialogWindow = action.payload;
        },
        updateDialogWindowType: (state, action: PayloadAction<DialogWindowType>) => {
            state.dialogWindowType = action.payload;
        },
    },
});

export const openDialogWindow = (dialogWindowType: DialogWindowType) => (dispatch: AppDispatch) => {
    dispatch(updateIsOpenDialogWindow(true));
    dispatch(updateDialogWindowType(dialogWindowType));
};

export const closeDialogWindow = () => (dispatch: AppDispatch) => {
    dispatch(updateIsOpenDialogWindow(false));
    dispatch(updateDialogWindowType(null));
};

export const { updateIsOpenDialogWindow, updateDialogWindowType } = dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;
