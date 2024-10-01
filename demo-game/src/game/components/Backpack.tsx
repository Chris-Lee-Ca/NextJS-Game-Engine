import BackpackIcon from "@mui/icons-material/Backpack";
import { Box, styled } from "@mui/material";
import { CUSTOM_STYLE } from "../lib/conts";

const BackpackWrapper = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    color: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "0 10px 0 10px",
    margin: "0 10px 0 10px",
    borderRadius: "5px",
    width: "200px",
});

interface BackpackProps {}

export const Backpack = (props: BackpackProps) => {
    return (
        <BackpackWrapper>
            <BackpackIcon />:
        </BackpackWrapper>
    );
};
