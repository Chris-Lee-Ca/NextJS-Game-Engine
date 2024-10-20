import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import VirtualKeyboardButton from "./template/VirtualKeyboardButton";
import { CUSTOM_STYLE } from "../lib/conts";
import { KeyboardEventHandler } from "game-engine/extensions/plugins/keyboardEventPlugin";

const Container = styled(Box)({
    position: "absolute",
    bottom: "0%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "100",
    borderRadius: "25% 25% 0 0",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_WHITE,
});

const InenerContainer = styled(Grid)({
    maxWidth: "400px",
    padding: "50px",
});

const DirectionKeyContainer = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

const ActionKeyContainer = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

interface VirtualKeyboardProps {
    keyboardEventHandler: KeyboardEventHandler;
}

const VirtualKeyboard = (props: VirtualKeyboardProps) => {
    const { keyboardEventHandler } = props;

    const handleOnMouseDownButton = (command: string) => {
        const mockEvent = { key: command } as KeyboardEvent;
        keyboardEventHandler.handleKeyDown(mockEvent);
    };

    const handleOnMouseUpButton = (command: string) => {
        const mockEvent = { key: command } as KeyboardEvent;
        keyboardEventHandler.handleKeyUp(mockEvent);
    };

    return (
        <Container>
            <InenerContainer container>
                <DirectionKeyContainer item xs={6}>
                    <Box component="div">
                        <VirtualKeyboardButton
                            style={{ marginBottom: "0px" }}
                            type="direction"
                            correspondingKeys={["ArrowUp", "w"]}
                            onMouseDown={() => handleOnMouseDownButton("ArrowUp")}
                            onMouseUp={() => handleOnMouseUpButton("ArrowUp")}
                        >
                            <ArrowDropUpIcon />
                        </VirtualKeyboardButton>
                    </Box>
                    <Box component="div" display={"flex"}>
                        <VirtualKeyboardButton
                            type="direction"
                            correspondingKeys={["ArrowLeft", "a"]}
                            onMouseDown={() => handleOnMouseDownButton("ArrowLeft")}
                            onMouseUp={() => handleOnMouseUpButton("ArrowLeft")}
                        >
                            <ArrowLeftIcon />
                        </VirtualKeyboardButton>
                        <VirtualKeyboardButton
                            type="direction"
                            correspondingKeys={["ArrowDown", "s"]}
                            onMouseDown={() => handleOnMouseDownButton("ArrowDown")}
                            onMouseUp={() => handleOnMouseUpButton("ArrowDown")}
                        >
                            <ArrowDropDownIcon />
                        </VirtualKeyboardButton>
                        <VirtualKeyboardButton
                            type="direction"
                            correspondingKeys={["ArrowRight", "d"]}
                            onMouseDown={() => handleOnMouseDownButton("ArrowRight")}
                            onMouseUp={() => handleOnMouseUpButton("ArrowRight")}
                        >
                            <ArrowRightIcon />
                        </VirtualKeyboardButton>
                    </Box>
                </DirectionKeyContainer>
                <ActionKeyContainer item xs={6}>
                    <Box component="div" display={"flex"}>
                        <VirtualKeyboardButton
                            type="interaction"
                            correspondingKeys={["k"]}
                            onMouseDown={() => handleOnMouseDownButton("k")}
                            onMouseUp={() => handleOnMouseUpButton("k")}
                            style={{ marginRight: "10px" }}
                        >
                            K
                        </VirtualKeyboardButton>
                        <VirtualKeyboardButton
                            type="interaction"
                            correspondingKeys={["l"]}
                            onMouseDown={() => handleOnMouseDownButton("l")}
                            onMouseUp={() => handleOnMouseUpButton("l")}
                        >
                            L
                        </VirtualKeyboardButton>
                    </Box>
                </ActionKeyContainer>
            </InenerContainer>
        </Container>
    );
};

export default VirtualKeyboard;
