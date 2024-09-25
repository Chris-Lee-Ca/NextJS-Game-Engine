"use client";

import { Box, Button, styled } from "@mui/material";
import React, { useState } from "react";
import { CUSTOM_STYLE } from "../lib/conts";
import ModeIcon from "@mui/icons-material/Mode";
import { LevelEditor } from "./LevelEditor";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateEditMode } from "../redux/features/gameSlice";

const StatusBarWrapper = styled(Box)({
    top: 0,
    width: "100%",
    height: `${CUSTOM_STYLE.SIZE.STATUS_BAR_HEIGHT}px`,
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_BLUE,
    border: "2px solid red",
    display: "flex",
    padding: "5px",
});

const StatusBar = () => {
    const isEditMode = useAppSelector((state) => state.game.editMode);
    const dispatch = useAppDispatch();

    return (
        <>
            <StatusBarWrapper>
                <Button
                    variant="outlined"
                    style={{
                        backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
                        color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
                    }}
                    onClick={() => {
                        dispatch(updateEditMode(!isEditMode));
                    }}
                >
                    <ModeIcon />
                </Button>
            </StatusBarWrapper>
            {isEditMode && <LevelEditor />}
        </>
    );
};

export default StatusBar;
