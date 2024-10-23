"use client";

import React, { lazy, Suspense } from "react";
import GameStoreProvider from "./GameStoreProvider";

// Load GameInitializer after the game store provider has finished initializing.
const LazyGameInitializer = lazy(() => import("./GameInitializer"));

const Game = () => {
    return (
        <GameStoreProvider>
            <Suspense fallback={<div />}>
                <LazyGameInitializer />
            </Suspense>
        </GameStoreProvider>
    );
};

export default Game;
