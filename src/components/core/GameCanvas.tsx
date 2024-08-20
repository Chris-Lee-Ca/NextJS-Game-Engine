"use client";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState, useEffect, ReactNode } from "react";

type GameCanvasProps = { children?: ReactNode };

const Canvas = styled(Box)({
    backgroundColor: "orange",
    height: "100vh",
    maxHeight: "50%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
});

const GameCanvas = ({ children }: GameCanvasProps) => {
    return <Canvas>{children}</Canvas>; // No JSX needed for this component
};

export default GameCanvas;
