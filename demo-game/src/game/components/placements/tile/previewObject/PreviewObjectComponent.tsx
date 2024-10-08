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
    border: CUSTOM_STYLE.BORDER.PREVIEW_OBJECT_BORDER,
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
});

interface PreviewObjectComponentProps {
    id: string;
}
const PreviewObjectComponent = (props: PreviewObjectComponentProps) => {
    return <ItemBox>{props.id}</ItemBox>;
};

export default PreviewObjectComponent;
