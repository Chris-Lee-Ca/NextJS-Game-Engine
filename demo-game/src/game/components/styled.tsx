import { Box, Button, Input, TextField, Typography, styled } from "@mui/material";
import { CUSTOM_STYLE } from "../lib/conts";
import { CSSProperties } from "react";

export const Panel = styled(Box)({
    borderRadius: "5px",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    position: "absolute",
    padding: "20px",
});

export const DefaultText = styled(Typography)({
    color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
});

export const DefaultTitle = styled(DefaultText)({
    fontWeight: "bold",
});

export const DefaultInput = styled("input")({
    width: "90%",
    padding: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#fff",
    border: "4px solid #000",
    position: "relative",
    overflow: "hidden",
    borderRadius: "5px",
    outline: "none",
    boxShadow: "3px 3px 0 #4a90e2",
    marginBottom: "5px",
});

export const DefaultButton = styled(Button)({
    color: "white",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_BACKGROUND_COLOR,
});
