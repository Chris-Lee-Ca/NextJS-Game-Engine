"use client";

import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector, useAppStore } from "@/game/redux/hooks";
import GameLoop from "game-engine/core/GameLoop";
import { GAME_SETTING } from "../lib/conts";
import { KeyboardEventHandler } from "game-engine/extensions/plugins/keyboardEventPlugin";
import { VirtualKeyboardHandler } from "game-engine/extensions/plugins/virtualKeyboardPlugin";
import { FadeTransition, LEVEL_PLUGIN_ID, LevelHandler } from "game-engine/extensions/plugins/levelPlugin";
import {
    DEFAULT_DIRECTION_KEY_MAPPING,
    DirectionControlHandler,
} from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import { DoubleTapRunHandler } from "game-engine/extensions/plugins/doubleTapRunPlugin";
import { ActionControlHandler } from "game-engine/extensions/modules/MainCharacterActionControlModule";
import PlacementFactory from "../components/placements/PlacementFactory";
import { allDemoLevelInfo } from "../lib/level";
import { registerModalResolver } from "@/game/components/modal/ModalWindowFactory";
import { createCompanyModalWindowComponent } from "@/game/components/placements/tile/company/ModalComponent/CompanyModalWindowTemplate";

registerModalResolver("company-", (id) => createCompanyModalWindowComponent(id));
import GameBody from "./GameBody";
import { ACTION_KEY_MAPPING } from "../lib/control";
import { AudioHandler } from "game-engine/extensions/plugins/audioPlugin";

// Create & Init GameLoop
const GameInitializer = () => {
    const appStore = useAppStore();
    const dispatch = useAppDispatch();
    const levelState = useAppSelector((state) => state[LEVEL_PLUGIN_ID]);

    // Memoize the game loop instance
    const gameLoop = useMemo(() => {
        return GameLoop.getInstance({
            targetFPS: GAME_SETTING.TARGET_FPS,
            reduxStore: appStore,
            plugins: [
                new KeyboardEventHandler({ dispatch }),
                new VirtualKeyboardHandler(),
                // Disable double-tap detection while a modal or dialog is open so overlay
                // interactions don't accidentally activate run mode.
                new DoubleTapRunHandler({
                    dispatch,
                    getIsBlocked: () => {
                        const state = appStore.getState();
                        return state.modal.isOpenModalWindow || state.dialog.isOpenDialogWindow;
                    },
                }),
                new LevelHandler({
                    store: appStore,
                    dispatch,
                    gameObjectFactory: new PlacementFactory(),
                    currentLevel: levelState.currentLevel ? levelState.currentLevel : "intro-level-1",
                    allLevelInfo:
                        Object.keys(levelState.allLevelInfo).length !== 0 ? levelState.allLevelInfo : allDemoLevelInfo,
                    transition: FadeTransition(),
                }),
                new AudioHandler({ store: appStore }),
            ],
            modules: [
                new DirectionControlHandler({
                    store: appStore,
                    dispatch,
                    directionKeyMapping: DEFAULT_DIRECTION_KEY_MAPPING,
                }),
                new ActionControlHandler({ store: appStore, dispatch, actionKeyMapping: ACTION_KEY_MAPPING }),
            ],
        });
    }, [appStore, dispatch, levelState.allLevelInfo, levelState.currentLevel]);

    return <GameBody gameLoop={gameLoop} />;
};

export default GameInitializer;
