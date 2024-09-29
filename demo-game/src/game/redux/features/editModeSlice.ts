import { defaultLevelTheme } from "@/game/lib/level";
import { EditModeLevelInfo, PreviewObjectItem } from "@/game/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setLevelInfoByKey } from "game-engine/redux/modules/levelModule";
import { AppDispatch } from "../store";
import { EDIT_MODE_LEVEL_NAME } from "@/game/lib/conts";

export interface EditModeStateInterface {
    editMode: boolean;
    selectedItem: PreviewObjectItem | null;
    editModeLevelInfo: EditModeLevelInfo;
}

const initialState: EditModeStateInterface = {
    editMode: false,
    selectedItem: null,
    editModeLevelInfo: {
        levelTitle: "default-game-level-title",
        theme: defaultLevelTheme,
        tilesWidth: 3,
        tilesHeight: 3,
        placements: [
            {
                id: "Tile-preview-object-0-0",
                coord: { x: 0, y: 0 },
                type: "Tile",
                itemName: "preview object",
                previewObjectItem: {
                    type: "Character",
                    objectItemName: "main character",
                    avatar: undefined,
                },
            },
            {
                id: "Character-main-character-0-0",
                coord: { x: 0, y: 0 },
                type: "Character",
                itemName: "main character",
            },
        ],
    },
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
        updateEditModeLevelInfo: (state, action: PayloadAction<EditModeLevelInfo>) => {
            state.editModeLevelInfo = action.payload;
        },
    },
});

export const syncEditModeLevelInfo = (editModeLevelInfo: EditModeLevelInfo) => (dispatch: AppDispatch) => {
    dispatch(updateEditModeLevelInfo(editModeLevelInfo));
    dispatch(setLevelInfoByKey({ key: EDIT_MODE_LEVEL_NAME, levelInfo: editModeLevelInfo }));
};

export const { updateEditMode, updateSelectedItem, updateEditModeLevelInfo } = editModeSlice.actions;
export const editModeReducer = editModeSlice.reducer;
