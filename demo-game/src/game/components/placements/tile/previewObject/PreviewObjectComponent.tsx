"use client";

import React from "react";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { Box, styled } from "@mui/material";
import GridHelper from "game-engine/helper/GridHelper";
import { handleDisplayAvatar } from "@/game/lib/previewObjectList";
import { PreviewObjectItem } from "@/game/types/general";

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
    userSelect: "none",
});

interface PreviewObjectComponentProps {
    previewObjectItem: PreviewObjectItem;
}
const PreviewObjectComponent = (props: PreviewObjectComponentProps) => {
    const { previewObjectItem } = props;

    return <ItemBox>{handleDisplayAvatar(previewObjectItem)}</ItemBox>;
};

export default PreviewObjectComponent;
