"use client";

import GameBody from "./GameBody";
import GameStoreProvider from "./GameStoreProvider";

const Game = () => {
    return (
        <GameStoreProvider>
            <GameBody />
        </GameStoreProvider>
    );
};

export default Game;
