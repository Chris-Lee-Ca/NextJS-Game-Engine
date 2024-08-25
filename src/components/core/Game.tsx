"use client";

import GameStoreProvider from "@/components/core/GameStoreProvider";
import React from "react";
import GameLoop from "./GameLoop";
import GameCanvas from "./GameCanvas";
import MainCharacter from "../character/mainCharacter";
import Monster from "../enemy/monster";
import Viewport from "./Viewport";

const Game = () => {
    return (
        <GameStoreProvider>
            <GameLoop>
                <Viewport>
                    <GameCanvas>
                        <MainCharacter />
                        {/* <Monster /> */}
                    </GameCanvas>
                </Viewport>
            </GameLoop>
        </GameStoreProvider>
    );
};

export default Game;
