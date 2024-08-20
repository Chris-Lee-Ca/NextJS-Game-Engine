"use client";

import GameStoreProvider from "@/components/core/GameStoreProvider";
import React from "react";
import GameLoop from "./GameLoop";
import GameCanvas from "./GameCanvas";
import DirectionControl from "./DirectionControl";
import MainCharacter from "../character/mainCharacter";
import Monster from "../enemy/monster";

const Game = () => {
    return (
        <GameStoreProvider>
            <GameLoop>
                <DirectionControl />
                <GameCanvas>
                    <MainCharacter />
                    <Monster />
                </GameCanvas>
            </GameLoop>
        </GameStoreProvider>
    );
};

export default Game;
