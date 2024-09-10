"use client";

import React, { useEffect } from "react";
import GameCanvas from "./GameCanvas";
import Viewport from "@/gameEngine/core/Viewport";
import { useAppDispatch, useAppSelector, useAppStore } from "@/game/redux/hooks";
import { useCSSVariable } from "@/gameEngine/hooks/useCSSVariable";
import GameLoop from "@/gameEngine/core/GameLoop";
import { CUSTOM_STYLE, GAME_SETTING } from "../lib/conts";
import { KeyboardEventHandler } from "@/gameEngine/redux/features/modules/keyboardEventModule";
import { LevelHandler } from "@/gameEngine/redux/features/modules/levelModule";
import { DirectionControlHandler } from "@/gameEngine/redux/features/modules/MainCharacterControlModule";
import PlacementFactory from "../components/placements/PlacementFactory";
import { allDemoLevelInfo } from "../lib/level";

const GameBody = () => {
    const appStore = useAppStore();
    const dispatch = useAppDispatch();
    const levelState = useAppSelector((state) => state.level);
    const gameLoop = GameLoop.getInstance({
        targetFPS: GAME_SETTING.TARGET_FPS,
        reduxStore: appStore,
        modules: [
            new KeyboardEventHandler({ dispatch }),
            new LevelHandler({
                store: appStore,
                dispatch,
                gameObjectFactory: new PlacementFactory(),
                currentLevel: "demo_1",
                allLevelInfo: allDemoLevelInfo,
            }),
            new DirectionControlHandler({ store: appStore, dispatch }),
        ],
    });
    const scaleFactor = useCSSVariable("--scale-factor");

    useEffect(() => {
        gameLoop.start();

        return () => {
            gameLoop.stop();
        };
    }, [levelState.currentLevel, scaleFactor]);

    return (
        <Viewport backgroundColor={CUSTOM_STYLE.COLOR.MAIN_BLUE}>
            <GameCanvas />
        </Viewport>
    );
};

export default GameBody;
