"use client";

import React, { ReactNode } from "react";
import { Box, styled } from "@mui/material";
import { Pixel } from "game-engine/types/general";

type ViewportProps = {
    children: ReactNode;
    backgroundColor: string;
    top: Pixel;
    bottom: Pixel;
    left: Pixel;
    right: Pixel;
};

const ViewportBox = styled(Box)({
    height: "100vh",
    maxHeight: "100%",
    width: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // border: "2px solid red",
});

const Viewport = (props: ViewportProps) => {
    const { children, backgroundColor, top, bottom, left, right } = props;
    return (
        <ViewportBox
            style={{ backgroundColor, top: `${top}px`, bottom: `${bottom}px`, left: `${left}px`, right: `${right}px` }}
        >
            {children}
        </ViewportBox>
    );
};

export default Viewport;
