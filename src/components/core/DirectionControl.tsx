"use client";

import { Direction } from "@/lib/types";
import { setPlayerPosition } from "@/redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState, useEffect } from "react";

const DirectionControl = () => {
    const dispatch = useAppDispatch();
    const updatePlayerPosition = (direction: Direction) =>
        dispatch(setPlayerPosition(direction));

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    updatePlayerPosition({ x: 0, y: -1 });
                    break;
                case "ArrowDown":
                    updatePlayerPosition({ x: 0, y: 1 });
                    break;
                case "ArrowLeft":
                    updatePlayerPosition({ x: -1, y: 0 });
                    break;
                case "ArrowRight":
                    updatePlayerPosition({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
                    event.key
                )
            ) {
                updatePlayerPosition({ x: 0, y: 0 });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return null; // No JSX needed for this component
};

export default DirectionControl;
