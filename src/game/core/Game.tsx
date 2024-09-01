"use client";

import GameStoreProvider from "@/game/core/GameStoreProvider";
import React from "react";
import GameLoop from "./GameLoop";
import GameCanvas from "./GameCanvas";
import MainCharacter from "../components/placement/character/mainCharacter";
import Monster from "../components/placement/enemy/monster";
import Viewport from "./Viewport";

const Game = () => {
    return (
        <GameStoreProvider>
            <GameLoop>
                <Viewport>
                    <MainCharacter />
                    <GameCanvas />
                </Viewport>
            </GameLoop>
        </GameStoreProvider>
    );
};

export default Game;
