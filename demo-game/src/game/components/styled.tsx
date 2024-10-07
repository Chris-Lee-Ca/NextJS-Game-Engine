import { Box, Button, Typography, styled } from "@mui/material";
import { CUSTOM_STYLE } from "../lib/conts";

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

export const ModalTitle = styled(Box)({
    fontWeight: 'bolder',
    fontSize: '30px',
    marginBottom: '20px'
})

export const ModalContent = styled(Box)({
    width: '100%',
    fontWeight: 'bold',
    textDecoration: 'underline',
    textAlign: 'center',
    marginBottom: '5px'
})

export const DialogContent = styled(Box)({
    width: "250px",
    fontWeight: "bold",
    textDecoration: "underline",
});
