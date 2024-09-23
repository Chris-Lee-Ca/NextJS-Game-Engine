"use client";

import GameInitializer from "./GameInitializer";
import GameStoreProvider from "./GameStoreProvider";

const Game = () => {
    return (
        <GameStoreProvider>
            <GameInitializer />
        </GameStoreProvider>
    );
};

export default Game;
