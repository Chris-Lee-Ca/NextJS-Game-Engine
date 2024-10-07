import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

export type ModalWindowType = "intro" | "skill" | "project" | "education"| "experience" | null;

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
    dispatch(updateIsOpenModalWindow(true));
    dispatch(updateModalWindowType(modalWindowType));
};

export const closeModalWindow = () => (dispatch: AppDispatch) => {
    dispatch(updateIsOpenModalWindow(false));
    dispatch(updateModalWindowType(null));
};

export const { updateIsOpenModalWindow, updateModalWindowType } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
