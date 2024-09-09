"use client";

import React, { useEffect } from "react";
import GameCanvas from "./GameCanvas";
import Viewport from "@/gameEngine/core/Viewport";
import { useAppSelector, useAppStore } from "@/game/redux/hooks";
import { useCSSVariable } from "@/gameEngine/hooks/useCSSVariable";
import GameLoop from "@/gameEngine/core/GameLoop";
import { CUSTOM_STYLE, GAME_SETTING } from "../lib/conts";
import { KeyboardEventHandler } from "@/gameEngine/redux/features/modules/keyboardEventModule";
import { LevelHandler } from "@/gameEngine/redux/features/modules/levelModule";
import { DirectionControlHandler } from "@/gameEngine/redux/features/modules/MainCharacterControlModule";

const GameBody = () => {
    const appStore = useAppStore();
    const levelState = useAppSelector((state) => state.level);
    const gameLoop = GameLoop.getInstance({
        targetFPS: GAME_SETTING.TARGET_FPS,
        reduxStore: appStore,
        modules: [
            KeyboardEventHandler.getInstance(),
            LevelHandler.getInstance(),
            DirectionControlHandler.getInstance(),
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
