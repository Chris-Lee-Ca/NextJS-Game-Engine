"use client";

import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector, useAppStore } from "@/game/redux/hooks";
import GameLoop from "game-engine/core/GameLoop";
import { GAME_SETTING } from "../lib/conts";
import { KeyboardEventHandler } from "game-engine/redux/modules/keyboardEventModule";
import { LevelHandler } from "game-engine/redux/modules/levelModule";
import { DirectionControlHandler } from "game-engine/redux/modules/MainCharacterControlModule";
import PlacementFactory from "../components/placements/PlacementFactory";
import { allDemoLevelInfo } from "../lib/level";
import GameBody from "./GameBody";

const GameInitializer = () => {
    const appStore = useAppStore();
    const dispatch = useAppDispatch();
    const levelState = useAppSelector((state) => state.level);

    // Memoize the game loop instance
    const gameLoop = useMemo(() => {
        return GameLoop.getInstance({
            targetFPS: GAME_SETTING.TARGET_FPS,
            reduxStore: appStore,
            modules: {
                "keyboard-event-handler": new KeyboardEventHandler({ dispatch }),
                "level-handler": new LevelHandler({
                    store: appStore,
                    dispatch,
                    gameObjectFactory: new PlacementFactory(),
                    currentLevel: levelState.currentLevel ? levelState.currentLevel : "demo_1",
                    allLevelInfo:
                        Object.keys(levelState.allLevelInfo).length !== 0 ? levelState.allLevelInfo : allDemoLevelInfo,
                }),
                "direction-handler": new DirectionControlHandler({ store: appStore, dispatch }),
            },
        });
    }, [appStore, dispatch]);

    return <GameBody gameLoop={gameLoop} />;
};

export default GameInitializer;
