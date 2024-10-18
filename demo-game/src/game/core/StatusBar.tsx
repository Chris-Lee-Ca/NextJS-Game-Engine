"use client";

import { Box, styled } from "@mui/material";
import React from "react";
import { CUSTOM_STYLE } from "../lib/conts";
import { LevelEditorStatusBarButton } from "./LevelEditor/LevelEditorStatusBarButton";
import { Backpack } from "../components/Backpack";
import { LevelNavigator } from "../components/LevelNavigator";

const StatusBarWrapper = styled(Box)({
    top: 0,
    width: "100%",
    height: `${CUSTOM_STYLE.SIZE.STATUS_BAR_HEIGHT}px`,
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    display: "flex",
    padding: "7px",
    justifyContent: "space-between",
});

const LeftSection = styled(Box)({
    display: "flex",
});

const RightSection = styled(Box)({
    display: "flex",
});

interface StatusBarProps {}
const StatusBar = (_props: StatusBarProps) => {
    return (
        <>
            <StatusBarWrapper>
                <LeftSection>
                    <Backpack />
                </LeftSection>
                <RightSection>
                    <LevelNavigator />
                    <LevelEditorStatusBarButton />
                </RightSection>
            </StatusBarWrapper>
        </>
    );
};

export default StatusBar;
