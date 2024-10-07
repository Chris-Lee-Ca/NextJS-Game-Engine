import { gameEngineReducer } from "game-engine/redux/store";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./features/gameSlice";
import { editModeReducer } from "./features/editModeSlice";
import { KEYBOARD_EVENT_PLUGIN_ID, keyboardEventReducer } from "game-engine/extensions/plugins/keyboardEventPlugin";
import {
    MAIN_CHARACTER_CONTROL_MODULE_ID,
    mainCharacterReducer,
} from "game-engine/extensions/modules/MainCharacterControlModule";
import { LEVEL_PLUGIN_ID, levelReducer } from "game-engine/extensions/plugins/levelPlugin";
import { backpackReducer } from "./features/backpackSlice";
import { dialogReducer } from "./features/dialogSlice";
import { modalReducer } from "./features/modalSlice";

const rootReducer = combineReducers({
    ...gameEngineReducer,
    [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
    [MAIN_CHARACTER_CONTROL_MODULE_ID]: mainCharacterReducer,
    [LEVEL_PLUGIN_ID]: levelReducer,
    game: gameReducer,
    editMode: editModeReducer,
    backpack: backpackReducer,
    dialog: dialogReducer,
    modal: modalReducer,
});

export const makeGameStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeGameStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
