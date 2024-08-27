"use client";

import GameStoreProvider from "@/game/core/GameStoreProvider";
import React from "react";
import GameLoop from "./GameLoop";
import GameCanvas from "./GameCanvas";
import MainCharacter from "../components/character/mainCharacter";
import Monster from "../components/enemy/monster";
import Viewport from "./Viewport";

const Game = () => {
    return (
        <GameStoreProvider>
            <GameLoop>
                <Viewport>
                    <MainCharacter />
                    <GameCanvas>{/* <Monster /> */}</GameCanvas>
                </Viewport>
            </GameLoop>
        </GameStoreProvider>
    );
};

export default Game;
