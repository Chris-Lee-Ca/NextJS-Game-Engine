"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Box, styled } from "@mui/material";

type ViewportProps = { children?: ReactNode };

const ViewportBox = styled(Box)({
    backgroundColor: "green",
    height: "100vh",
    maxHeight: "100%",
    width: "100%",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
});

const Viewport = ({ children }: ViewportProps) => {
    return <ViewportBox>{children}</ViewportBox>;
};

export default Viewport;
