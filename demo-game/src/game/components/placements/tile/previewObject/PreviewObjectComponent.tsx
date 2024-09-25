"use client";

import React from "react";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { Box, styled } from "@mui/material";
import GridHelper from "game-engine/helper/GridHelper";

const ItemBox = styled(Box)({
    width: GridHelper.getGridSizeInPixel(),
    height: GridHelper.getGridSizeInPixel(),
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    borderRadius: "5px",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
});

interface PreviewObjectComponentProps {
    itemName: string;
}
const PreviewObjectComponent = (props: PreviewObjectComponentProps) => {
    return <ItemBox>{props.itemName}</ItemBox>;
};

export default PreviewObjectComponent;
