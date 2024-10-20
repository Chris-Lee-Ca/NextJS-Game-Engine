import { CUSTOM_STYLE } from "@/game/lib/conts";
import { Button, styled } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";

const KeyBoardButton = styled(Button)({
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    border: `3px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    boxShadow: CUSTOM_STYLE.SHADOW.MAIN_BLACK_SHADOW,
    margin: "2px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
        backgroundColor: CUSTOM_STYLE.COLOR.MAIN_BLUE,
    },
});

const ActionButton = styled(Button)({
    maxWidth: "40px",
    maxHeight: "40px",
    minWidth: "40px",
    minHeight: "40px",
    borderRadius: "100%",
    border: `3px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    boxShadow: CUSTOM_STYLE.SHADOW.MAIN_BLACK_SHADOW,
    "&:hover": {
        backgroundColor: CUSTOM_STYLE.COLOR.MAIN_BLUE,
    },
    fontWeight: "bolder",
});

interface VirtualKeyboardButtonProps {
    children: any;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    correspondingKeys: string[];
    type: "direction" | "interaction";
    style?: CSSProperties;
}

const VirtualKeyboardButton = ({
    children,
    onMouseDown,
    onMouseUp,
    correspondingKeys,
    type,
    style,
}: VirtualKeyboardButtonProps) => {
    const [isChangeColor, setIsChangeColor] = useState<boolean>(false);
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handleMouseDown = () => {
        setIsPressed(true);
        onMouseDown?.();
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        onMouseUp?.();
    };

    const keyBoardListener = (e: any) => {
        if (!correspondingKeys.includes(e.key)) return;
        setIsChangeColor(true);
        setTimeout(() => setIsChangeColor(false), 200);
    };

    useEffect(() => {
        document.addEventListener("keydown", keyBoardListener);
        return () => {
            document.removeEventListener("keydown", keyBoardListener);
        };
    }, []);

    useEffect(() => {
        const handleMouseUpGlobal = () => {
            setIsPressed(false);
            onMouseUp?.();
        };

        document.addEventListener("mouseup", handleMouseUpGlobal);

        return () => {
            document.removeEventListener("mouseup", handleMouseUpGlobal);
        };
    }, []);

    const ButtonComponent = type === "direction" ? KeyBoardButton : ActionButton;

    return (
        <ButtonComponent
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
                ...style,
                backgroundColor: isChangeColor ? CUSTOM_STYLE.COLOR.MAIN_BLUE : CUSTOM_STYLE.COLOR.MAIN_WHITE,
            }}
        >
            {children}
        </ButtonComponent>
    );
};

export default VirtualKeyboardButton;
