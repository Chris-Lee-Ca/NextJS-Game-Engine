import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Box, Button, Typography, styled } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CUSTOM_STYLE } from "../lib/conts";
import { setCurrentLevel } from "game-engine/extensions/plugins/levelPlugin";

const LevelNavigatorWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: CUSTOM_STYLE.BORDER.GRID_BORDER,
    padding: "5px",
    margin: "5px",
});

const Text = styled(Typography)({
    color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
});

const ButtonWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60px",
});

const StyledButton = styled(Button)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    color: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    minWidth: "0px",
    padding: "0px",
    "&:hover": {
        backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
        color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    },
});

type Command = "up" | "down";

export const LevelNavigator: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentLevel, allLevelInfo } = useAppSelector((state) => state.level);
    const { editMode } = useAppSelector((state) => state.editMode);

    const handleGetNewLevel = (command: Command): string | null | undefined => {
        const currentLevelInfo = allLevelInfo[currentLevel];
        return command === "up" ? currentLevelInfo.nextLevel : command === "down" ? currentLevelInfo.prevLevel : null;
    };

    const handleChangeLevel = (command: Command) => {
        const newLevel = handleGetNewLevel(command);
        dispatch(setCurrentLevel(newLevel as string));
    };

    const handleIsDisableButton = (command: Command): boolean => {
        const newLevel = handleGetNewLevel(command);
        return typeof newLevel === "undefined" || newLevel === null || !(newLevel in allLevelInfo);
    };

    return (
        <LevelNavigatorWrapper>
            <Text>Level Navigator: </Text>
            <ButtonWrapper>
                <StyledButton
                    variant="outlined"
                    onClick={() => {
                        handleChangeLevel("up");
                    }}
                    disabled={handleIsDisableButton("up") || editMode}
                >
                    <KeyboardArrowUpIcon />
                </StyledButton>
                <StyledButton
                    variant="outlined"
                    onClick={() => {
                        handleChangeLevel("down");
                    }}
                    disabled={handleIsDisableButton("down") || editMode}
                >
                    <KeyboardArrowDownIcon />
                </StyledButton>
            </ButtonWrapper>
        </LevelNavigatorWrapper>
    );
};
