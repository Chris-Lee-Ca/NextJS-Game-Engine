"use client";

import React, { useEffect } from "react";
import GameCanvas from "./GameCanvas";
import MainCharacter from "../components/placement/character/mainCharacter";
import Viewport from "./Viewport";
import { useAppStore } from "../redux/hooks";
import GameLoop from "./GameLoop";

const GameBody = () => {
    const appStore = useAppStore();

    useEffect(() => {
        const gameLoop = GameLoop.getInstance();
        gameLoop.init(appStore);
        gameLoop.start();

        return () => {
            gameLoop.stop();
        };
    }, []);

    return (
        <Viewport>
            <MainCharacter />
            <GameCanvas />
        </Viewport>
    );
};

export default GameBody;
