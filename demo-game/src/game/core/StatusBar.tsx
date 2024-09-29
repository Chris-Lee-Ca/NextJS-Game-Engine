"use client";

import { Box, styled } from "@mui/material";
import React from "react";
import { CUSTOM_STYLE } from "../lib/conts";
import { LevelEditorStatusBarButton } from "./LevelEditor/LevelEditorStatusBarButton";

const StatusBarWrapper = styled(Box)({
    top: 0,
    width: "100%",
    height: `${CUSTOM_STYLE.SIZE.STATUS_BAR_HEIGHT}px`,
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    display: "flex",
    padding: "5px",
    justifyContent: "space-between",
});

const LeftSection = styled(Box)({});

const RightSection = styled(Box)({});

interface StatusBarProps {}
const StatusBar = (props: StatusBarProps) => {
    return (
        <>
            <StatusBarWrapper>
                <LeftSection></LeftSection>
                <RightSection>
                    <LevelEditorStatusBarButton />
                </RightSection>
            </StatusBarWrapper>
        </>
    );
};

export default StatusBar;
