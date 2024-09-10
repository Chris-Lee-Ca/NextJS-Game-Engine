"use client";

import React, { ReactNode } from "react";
import { Box, styled } from "@mui/material";

type ViewportProps = { children?: ReactNode; backgroundColor: string };

const ViewportBox = styled(Box)({
    height: "50vh",
    maxHeight: "100%",
    width: "50%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    border: "2px solid red",
});

const Viewport = ({ children, backgroundColor }: ViewportProps) => {
    return <ViewportBox style={{ backgroundColor }}>{children}</ViewportBox>;
};

export default Viewport;
