"use client";

import React, { useEffect } from "react";
import GameCanvas from "./GameCanvas";
import Viewport from "game-engine/core/Viewport";
import { useAppSelector } from "@/game/redux/hooks";
import { useCSSVariable } from "game-engine/hooks/useCSSVariable";
import GameLoop from "game-engine/core/GameLoop";
import { CUSTOM_STYLE } from "../lib/conts";
import { LevelEditor } from "./LevelEditor";
import { LevelHandler } from "game-engine/redux/modules/levelModule";

const GameBody = ({ gameLoop }: { gameLoop: GameLoop }) => {
    const levelState = useAppSelector((state) => state.level);
    const scaleFactor = useCSSVariable("--scale-factor");

    useEffect(() => {
        (gameLoop.modules["level-handler"] as LevelHandler).loadLevel();
        gameLoop.start();
        return () => {
            gameLoop.stop();
        };
    }, [levelState.currentLevel, scaleFactor]);

    return (
        <Viewport backgroundColor={CUSTOM_STYLE.COLOR.MAIN_BLUE}>
            <GameCanvas />
            <LevelEditor />
        </Viewport>
    );
};

export default GameBody;
