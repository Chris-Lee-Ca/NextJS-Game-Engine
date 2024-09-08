"use client";

import React, { useEffect, useState } from "react";
import GameCanvas from "./GameCanvas";
import Viewport from "./Viewport";
import { useAppDispatch, useAppSelector, useAppStore } from "../redux/hooks";
import GameLoop from "./GameLoop";
import { useCSSVariable } from "../hooks/useCSSVariable";

const GameBody = () => {
    const appStore = useAppStore();
    const dispatch = useAppDispatch();
    const gameState = useAppSelector((state) => state.game);
    const gameLoop = GameLoop.getInstance();
    const scaleFactor = useCSSVariable("--scale-factor");

    const [isInitialized, setIsInitialized] = useState(false); // Track initialization status

    useEffect(() => {
        // dispatch(setLevel(gameState.allLevelInfo[gameState.currentLevel]));
        gameLoop.init(appStore);
        setIsInitialized(true);

        gameLoop.start();

        return () => {
            gameLoop.stop();
        };
    }, [gameState.currentLevel, scaleFactor]);

    return <Viewport>{isInitialized && <GameCanvas />}</Viewport>;
};

export default GameBody;
