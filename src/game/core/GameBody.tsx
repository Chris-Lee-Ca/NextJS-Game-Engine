"use client";

import React, { useEffect } from "react";
import GameCanvas from "./GameCanvas";
import MainCharacter from "../components/placement/character/mainCharacter";
import Viewport from "./Viewport";
import { useAppDispatch, useAppSelector, useAppStore } from "../redux/hooks";
import GameLoop from "./GameLoop";

const GameBody = () => {
    const appStore = useAppStore();
    const dispatch = useAppDispatch();
    const gameState = useAppSelector((state) => state.game);
    const gameLoop = GameLoop.getInstance();

    useEffect(() => {
        // dispatch(setLevel(gameState.allLevelInfo[gameState.currentLevel]));
        gameLoop.init(appStore);
        gameLoop.start();

        return () => {
            gameLoop.stop();
        };
    }, [gameState.currentLevel]);

    return (
        <Viewport>
            <MainCharacter />
            <GameCanvas />
        </Viewport>
    );
};

export default GameBody;
