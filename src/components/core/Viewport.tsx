"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Box, styled } from "@mui/material";

type ViewportProps = { children?: ReactNode };

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
});

const Viewport = ({ children }: ViewportProps) => {
    return <ViewportBox>{children}</ViewportBox>;
};

export default Viewport;
