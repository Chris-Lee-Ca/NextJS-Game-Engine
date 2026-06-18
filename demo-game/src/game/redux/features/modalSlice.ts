import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getAudioHandler } from "game-engine/extensions/plugins/audioPlugin";

const SFX_OPEN  = { type: "sine" as const, frequency: 523, endFrequency: 784, duration: 0.22, volume: 0.25 };
const SFX_CLOSE = { type: "sine" as const, frequency: 660, endFrequency: 440, duration: 0.18, volume: 0.2 };

export type ModalWindowType = string | null;

export interface ModalStateInterface {
    isOpenModalWindow: boolean;
    modalWindowType: ModalWindowType;
}

const initialState: ModalStateInterface = {
    isOpenModalWindow: false,
    modalWindowType: null,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        updateIsOpenModalWindow: (state, action: PayloadAction<boolean>) => {
            state.isOpenModalWindow = action.payload;
        },
        updateModalWindowType: (state, action: PayloadAction<ModalWindowType>) => {
            state.modalWindowType = action.payload;
        },
    },
});

export const openModalWindow = (modalWindowType: ModalWindowType) => (dispatch: AppDispatch) => {
    getAudioHandler()?.playSfxDirect(SFX_OPEN);
    dispatch(updateIsOpenModalWindow(true));
    dispatch(updateModalWindowType(modalWindowType));
};

export const closeModalWindow = () => (dispatch: AppDispatch) => {
    getAudioHandler()?.playSfxDirect(SFX_CLOSE);
    dispatch(updateIsOpenModalWindow(false));
    dispatch(updateModalWindowType(null));
};

export const { updateIsOpenModalWindow, updateModalWindowType } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
