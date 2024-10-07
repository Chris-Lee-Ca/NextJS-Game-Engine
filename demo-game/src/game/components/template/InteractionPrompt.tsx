"use client"

import { CUSTOM_STYLE } from "@/game/lib/conts";
import { useAppSelector } from "@/game/redux/hooks";
import { ActionCommandType } from "@/game/types/control";
import { Box, keyframes, styled } from "@mui/material";
import { MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID } from "game-engine/extensions/modules/MainCharacterActionControlModule";
import { KEYBOARD_EVENT_PLUGIN_ID } from "game-engine/extensions/plugins/keyboardEventPlugin";
import { useEffect } from "react";

const arrowAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const InteractionPromptWrapper = styled(Box)({
    position: 'absolute',
    top: '-45px', // Adjust this according to the size of your game object
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none',
});

const Arrow = styled(Box)({
    width: 0,
    height: 0,
    borderTop: `15px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    marginBottom: '5px',
    animation: `${arrowAnimation} 1s infinite ease-in-out`,
});

const Button = styled(Box)({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '15px',
    fontWeight: 'bold',
    color: CUSTOM_STYLE.COLOR.MAIN_BLACK,
    border: `2px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`
});

interface InteractionPromptProps {
    promptKey: ActionCommandType;
    onClickFunction: () => void;
    
}
const InteractionPrompt: React.FC<InteractionPromptProps> = (props) => {
    const {promptKey, onClickFunction} = props;

    const heldKeys = useAppSelector((state) => state[MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID].heldActionKeys);

    useEffect(() => {
        if (heldKeys.includes(promptKey)) {
            onClickFunction();
        }
    }, [heldKeys]);

    return (
        <InteractionPromptWrapper>
            <Arrow />
            <Button>{promptKey}</Button>
        </InteractionPromptWrapper>
    );
};

export default InteractionPrompt;
