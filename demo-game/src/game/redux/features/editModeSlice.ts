import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setLevelInfoByKey } from "game-engine/extensions/plugins/levelPlugin";
import { AppDispatch } from "../store";
import { PreviewObjectItem } from "@/game/types/general";
import { defaultLevelTheme } from "@/game/lib/level";
import { EDIT_MODE_LEVEL_NAME } from "@/game/lib/conts";

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
