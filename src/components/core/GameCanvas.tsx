"use client";

import { useAppSelector } from "@/redux/hooks";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Stage } from "@pixi/react";
import React, { useState, useEffect, ReactNode } from "react";

type GameCanvasProps = { children?: ReactNode };

const Canvas = styled(Box)({
    backgroundColor: "orange",
    height: "100vh",
    maxHeight: "50%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
});

const GameCanvas = ({ children }: GameCanvasProps) => {
    const mainCharacterPosition = useAppSelector(
        (state) => state.mainCharacter.mainCharacterPosition
    );

    return (
        <Canvas
            style={{
                transform: `translate(
                    ${-mainCharacterPosition.x * 5}px, 
                    ${-mainCharacterPosition.y * 5}px
                    )`,
            }}
        >
            {children}
        </Canvas>
    );
};

export default GameCanvas;
