import { gameEngineReducer } from "game-engine/redux/store";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./features/gameSlice";
import { editModeReducer } from "./features/editModeSlice";
import { KEYBOARD_EVENT_PLUGIN_ID, keyboardEventReducer } from "game-engine/extensions/plugins/keyboardEventPlugin";
import {
    MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID,
    mainCharacterDirectionReducer,
} from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import { LEVEL_PLUGIN_ID, levelReducer } from "game-engine/extensions/plugins/levelPlugin";
import { backpackReducer } from "./features/backpackSlice";
import { dialogReducer } from "./features/dialogSlice";
import { modalReducer } from "./features/modalSlice";
import { MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID, mainCharacterActionReducer } from "game-engine/extensions/modules/MainCharacterActionControlModule";

const rootReducer = combineReducers({
    ...gameEngineReducer,
    [KEYBOARD_EVENT_PLUGIN_ID]: keyboardEventReducer,
    [MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID]: mainCharacterDirectionReducer,
    [MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID]: mainCharacterActionReducer,
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
