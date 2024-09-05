"use client";

import GameStoreProvider from "@/game/core/GameStoreProvider";
import GameBody from "./GameBody";

const Game = () => {
    return (
        <GameStoreProvider>
            <GameBody />
        </GameStoreProvider>
    );
};

export default Game;
