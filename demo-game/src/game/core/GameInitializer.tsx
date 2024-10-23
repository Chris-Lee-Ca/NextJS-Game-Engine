"use client";

import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector, useAppStore } from "@/game/redux/hooks";
import GameLoop from "game-engine/core/GameLoop";
import { GAME_SETTING } from "../lib/conts";
import { KeyboardEventHandler } from "game-engine/extensions/plugins/keyboardEventPlugin";
import { LEVEL_PLUGIN_ID, LevelHandler } from "game-engine/extensions/plugins/levelPlugin";
import {
    DEFAULT_DIRECTION_KEY_MAPPING,
    DirectionControlHandler,
} from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import { ActionControlHandler } from "game-engine/extensions/modules/MainCharacterActionControlModule";
import PlacementFactory from "../components/placements/PlacementFactory";
import { allDemoLevelInfo } from "../lib/level";
import GameBody from "./GameBody";
import { ACTION_KEY_MAPPING } from "../lib/control";

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
                new LevelHandler({
                    store: appStore,
                    dispatch,
                    gameObjectFactory: new PlacementFactory(),
                    currentLevel: levelState.currentLevel ? levelState.currentLevel : "intro-level-1",
                    allLevelInfo:
                        Object.keys(levelState.allLevelInfo).length !== 0 ? levelState.allLevelInfo : allDemoLevelInfo,
                }),
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
    }, [appStore, dispatch]);

    return <GameBody gameLoop={gameLoop} />;
};

export default GameInitializer;
