"use client";

import { Box, IconButton, Typography, styled } from "@mui/material";
import { CSSProperties, useEffect, useRef } from "react";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { useAppSelector } from "@/game/redux/hooks";
import { ActionCommandType } from "@/game/types/control";
import { MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID } from "game-engine/extensions/modules/MainCharacterActionControlModule";

const Container = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const ButtonIcon = styled(IconButton)({
    width: "40px",
    height: "40px",
    marginRight: "10px",
    color: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_BACKGROUND_COLOR,
    borderRadius: "20px",
});

const ButtonDescription = styled(Typography)({
    fontWeight: "bold",
});

interface GridSizeImageProps {
    style?: CSSProperties;
    onClickFunction: () => void;
    buttonKey: ActionCommandType;
    buttonDescription: string;
}

const ActionButton = (props: GridSizeImageProps) => {
    const { style, onClickFunction, buttonKey, buttonDescription } = props;

    const heldKeys = useAppSelector((state) => state[MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID].heldActionKeys);

    // Ref to track if the buttonKey was held at the component creation
    const previousHeldState = useRef(heldKeys.includes(buttonKey));

    useEffect(() => {
        const isKeyCurrentlyHeld = heldKeys.includes(buttonKey);

        // Check if the key was previously not held, and now it is held (new press)
        if (!previousHeldState.current && isKeyCurrentlyHeld) {
            onClickFunction(); // Trigger onClick when the key was just pressed
        }

        // Update previousHeldState after processing the current state
        previousHeldState.current = isKeyCurrentlyHeld;
    }, [heldKeys, buttonKey, onClickFunction]);

    return (
        <Container style={{ ...style }}>
            <ButtonIcon aria-label="close" onClick={onClickFunction}>
                {buttonKey.toUpperCase()}
            </ButtonIcon>
            <ButtonDescription>- {buttonDescription}</ButtonDescription>
        </Container>
    );
};

export default ActionButton;
