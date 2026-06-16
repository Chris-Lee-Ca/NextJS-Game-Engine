import styled from "@emotion/styled";
import { Box, GlobalStyles, Grid } from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { CUSTOM_STYLE } from "../lib/conts";
import { VirtualKeyboardHandler, VirtualKeyboardButton } from "game-engine/extensions/plugins/virtualKeyboardPlugin";

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

const directionButtonStyle = {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    border: `3px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    boxShadow: CUSTOM_STYLE.SHADOW.MAIN_BLACK_SHADOW,
    margin: "2px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    cursor: "pointer",
    padding: 0,
};

const actionButtonStyle = {
    maxWidth: "40px",
    maxHeight: "40px",
    minWidth: "40px",
    minHeight: "40px",
    borderRadius: "100%",
    border: `3px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    boxShadow: CUSTOM_STYLE.SHADOW.MAIN_BLACK_SHADOW,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    fontWeight: "bolder" as const,
    cursor: "pointer",
    padding: 0,
};

interface VirtualKeyboardProps {
    virtualKeyboardHandler: VirtualKeyboardHandler;
}

const VirtualKeyboard = ({ virtualKeyboardHandler }: VirtualKeyboardProps) => {
    return (
        <Container data-testid="virtual-keyboard">
            <GlobalStyles
                styles={{
                    ".vkb-btn:hover": { backgroundColor: `${CUSTOM_STYLE.COLOR.MAIN_BLUE} !important` },
                    ".vkb-btn[data-active]": { backgroundColor: `${CUSTOM_STYLE.COLOR.MAIN_BLUE} !important` },
                }}
            />
            <InenerContainer container>
                <DirectionKeyContainer item xs={6}>
                    <Box component="div">
                        <VirtualKeyboardButton
                            keyCode="ArrowUp"
                            aliasKeyCodes={["w"]}
                            handler={virtualKeyboardHandler}
                            className="vkb-btn"
                            style={{ ...directionButtonStyle, marginBottom: "0px" }}
                        >
                            <ArrowDropUpIcon />
                        </VirtualKeyboardButton>
                    </Box>
                    <Box component="div" display={"flex"}>
                        <VirtualKeyboardButton
                            keyCode="ArrowLeft"
                            aliasKeyCodes={["a"]}
                            handler={virtualKeyboardHandler}
                            className="vkb-btn"
                            style={directionButtonStyle}
                        >
                            <ArrowLeftIcon />
                        </VirtualKeyboardButton>
                        <VirtualKeyboardButton
                            keyCode="ArrowDown"
                            aliasKeyCodes={["s"]}
                            handler={virtualKeyboardHandler}
                            className="vkb-btn"
                            style={directionButtonStyle}
                        >
                            <ArrowDropDownIcon />
                        </VirtualKeyboardButton>
                        <VirtualKeyboardButton
                            keyCode="ArrowRight"
                            aliasKeyCodes={["d"]}
                            handler={virtualKeyboardHandler}
                            className="vkb-btn"
                            style={directionButtonStyle}
                        >
                            <ArrowRightIcon />
                        </VirtualKeyboardButton>
                    </Box>
                </DirectionKeyContainer>
                <ActionKeyContainer item xs={6}>
                    <Box component="div" display={"flex"}>
                        <VirtualKeyboardButton
                            keyCode="k"
                            handler={virtualKeyboardHandler}
                            className="vkb-btn"
                            style={{ ...actionButtonStyle, marginRight: "10px" }}
                        >
                            K
                        </VirtualKeyboardButton>
                        <VirtualKeyboardButton
                            keyCode="l"
                            handler={virtualKeyboardHandler}
                            className="vkb-btn"
                            style={actionButtonStyle}
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
