"use client";

import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector, useAppStore } from "@/game/redux/hooks";
import GameLoop from "game-engine/core/GameLoop";
import { GAME_SETTING } from "../lib/conts";
import { KeyboardEventHandler } from "game-engine/extensions/plugins/keyboardEventPlugin";
import { LEVEL_PLUGIN_ID, LevelHandler } from "game-engine/extensions/plugins/levelPlugin";
import { DirectionControlHandler } from "game-engine/extensions/modules/mainCharacterControlModule";
import PlacementFactory from "../components/placements/PlacementFactory";
import { allDemoLevelInfo } from "../lib/level";
import GameBody from "./GameBody";

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
                    currentLevel: levelState.currentLevel ? levelState.currentLevel : "demo_1",
                    allLevelInfo:
                        Object.keys(levelState.allLevelInfo).length !== 0 ? levelState.allLevelInfo : allDemoLevelInfo,
                }),
            ],
            modules: [new DirectionControlHandler({ store: appStore, dispatch })],
        });
    }, [appStore, dispatch]);

    return <GameBody gameLoop={gameLoop} />;
};

export default GameInitializer;
