"use client";

import { GameObject } from "@/lib/types";
import React, { useState, useEffect, useRef, ReactNode } from "react";

type ViewportProps = { children?: ReactNode };

const Viewport = ({ children }: ViewportProps) => {
    const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
    const animationFrame = useRef<number | null>(null);
    const previousTime = useRef<number>(performance.now());

    const addGameObject = (gameObject: GameObject) => {
        setGameObjects([...gameObjects, gameObject]);
    };

    const removeGameObject = (gameObject: GameObject) => {
        setGameObjects(gameObjects.filter((obj) => obj !== gameObject));
    };

    useEffect(() => {
        const Viewport = () => {
            const now = performance.now();
            const deltaTime = (now - previousTime.current) / 1000; // Delta time in seconds
            previousTime.current = now;

            gameObjects.forEach((gameObject) => gameObject.update(deltaTime));

            animationFrame.current = requestAnimationFrame(Viewport);
        };

        Viewport();

        return () => cancelAnimationFrame(animationFrame.current!);
    }, [gameObjects]);

    return <div>{children}</div>;
};

export default Viewport;
