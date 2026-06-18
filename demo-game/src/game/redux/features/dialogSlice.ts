import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getAudioHandler } from "game-engine/extensions/plugins/audioPlugin";

const SFX_OPEN  = { type: "sine" as const, frequency: 523, endFrequency: 784, duration: 0.22, volume: 0.25 };
const SFX_CLOSE = { type: "sine" as const, frequency: 660, endFrequency: 440, duration: 0.18, volume: 0.2 };

export type DialogWindowType = "intro" | "resume" | "finish-line" | null;

export interface DialogStateInterface {
    isOpenDialogWindow: boolean;
    dialogWindowType: DialogWindowType;
}

const initialState: DialogStateInterface = {
    isOpenDialogWindow: false,
    dialogWindowType: "intro",
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
    getAudioHandler()?.playSfxDirect(SFX_OPEN);
    dispatch(updateIsOpenDialogWindow(true));
    dispatch(updateDialogWindowType(dialogWindowType));
};

export const closeDialogWindow = () => (dispatch: AppDispatch) => {
    getAudioHandler()?.playSfxDirect(SFX_CLOSE);
    dispatch(updateIsOpenDialogWindow(false));
    dispatch(updateDialogWindowType(null));
};

export const { updateIsOpenDialogWindow, updateDialogWindowType } = dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;
