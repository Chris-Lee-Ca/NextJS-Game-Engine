"use client";

import React, { useEffect } from "react";
import GameCanvas from "./GameCanvas";
import { useAppSelector } from "@/game/redux/hooks";
import { useCSSVariable } from "game-engine/hooks/useCSSVariable";
import GameLoop from "game-engine/core/GameLoop";
import { CUSTOM_STYLE } from "../lib/conts";
import { LevelHandler } from "game-engine/redux/modules/levelModule";
import StatusBar from "./StatusBar";
import Viewport from "./Viewport";

const GameBody = ({ gameLoop }: { gameLoop: GameLoop }) => {
    const levelState = useAppSelector((state) => state.level);
    const scaleFactor = useCSSVariable("--scale-factor");

    useEffect(() => {
        (gameLoop.modules["level-handler"] as LevelHandler).loadLevel();
        gameLoop.start();
        return () => {
            gameLoop.stop();
        };
    }, [levelState.currentLevel, levelState.allLevelInfo[levelState.currentLevel], scaleFactor]);

    return (
        <>
            <StatusBar />
            <Viewport
                backgroundColor={CUSTOM_STYLE.COLOR.MAIN_BLUE}
                top={CUSTOM_STYLE.SIZE.ACTION_BAR_HEIGHT}
                bottom={0}
                left={0}
                right={0}
            >
                <GameCanvas />
            </Viewport>
        </>
    );
};

export default GameBody;
