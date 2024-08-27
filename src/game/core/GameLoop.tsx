"use client";

import { useAppDispatch } from "@/game/redux/hooks";
import { keyBoardEventHandler } from "@/game/redux/utils/keyboardEvent";
import { GameObject } from "@/game/types/general";
import React, { useState, useEffect, useRef, ReactNode } from "react";

type GameLoopProps = { children?: ReactNode };

const GameLoop = ({ children }: GameLoopProps) => {
    const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
    const animationFrame = useRef<number | null>(null);
    const previousTime = useRef<number>(performance.now());

    const dispatch = useAppDispatch();
    const handleKeyDown = (event: KeyboardEvent) => {
        dispatch(keyBoardEventHandler("keydown", event.key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        dispatch(keyBoardEventHandler("keyup", event.key));
    };

    const addGameObject = (gameObject: GameObject) => {
        setGameObjects([...gameObjects, gameObject]);
    };

    const removeGameObject = (gameObject: GameObject) => {
        setGameObjects(gameObjects.filter((obj) => obj !== gameObject));
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        const gameLoop = () => {
            const now = performance.now();
            const deltaTime = (now - previousTime.current) / 1000; // Delta time in seconds
            previousTime.current = now;

            gameObjects.forEach((gameObject) => gameObject.update(deltaTime));

            animationFrame.current = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            cancelAnimationFrame(animationFrame.current!);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [gameObjects]);

    return <div>{children}</div>;
};

export default GameLoop;
