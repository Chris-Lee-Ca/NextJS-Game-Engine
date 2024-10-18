import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PreviewObjectItem } from "@/game/types/general";

export interface EditModeStateInterface {
    editMode: boolean;
    selectedItem: PreviewObjectItem | null;
}

const initialState: EditModeStateInterface = {
    editMode: false,
    selectedItem: null,
};

export const editModeSlice = createSlice({
    name: "editMode",
    initialState,
    reducers: {
        updateEditMode: (state, action: PayloadAction<boolean>) => {
            state.editMode = action.payload;
        },
        updateSelectedItem: (state, action: PayloadAction<PreviewObjectItem | null>) => {
            state.selectedItem = action.payload;
        },
    },
});

export const { updateEditMode, updateSelectedItem } = editModeSlice.actions;
export const editModeReducer = editModeSlice.reducer;
