import { PickUpTypeItem } from "@/game/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BackpackStateInterface {
    backpackItems: PickUpTypeItem[];
}

const initialState: BackpackStateInterface = {
    backpackItems: [],
};

export const backpackSlice = createSlice({
    name: "backpack",
    initialState,
    reducers: {
        updateBackpack: (state, action: PayloadAction<PickUpTypeItem[]>) => {
            state.backpackItems = action.payload;
        },
        addItemToBackpack: (state, action: PayloadAction<PickUpTypeItem>) => {
            if (!state.backpackItems.includes(action.payload)) {
                state.backpackItems.push(action.payload);
            }
        },
    },
});
export const { updateBackpack, addItemToBackpack } = backpackSlice.actions;
export const backpackReducer = backpackSlice.reducer;
