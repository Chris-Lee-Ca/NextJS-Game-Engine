"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import HeroImage from "@/game/assets/componentImage/hero.png";
import InteractionPrompt from "@/game/components/template/InteractionPrompt";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { openModalWindow } from "@/game/redux/features/modalSlice";
import { WEB_LLM_PLUGIN_ID } from "game-engine/extensions/plugins/webLLMPlugin";
import { Box, Typography, keyframes, styled } from "@mui/material";
import { CUSTOM_STYLE } from "@/game/lib/conts";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const LoadingBadge = styled(Box)({
    position: "absolute",
    top: "-40px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_BLACK,
    color: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    borderRadius: "8px",
    padding: "2px 8px",
    whiteSpace: "nowrap",
    animation: `${pulse} 1.5s infinite ease-in-out`,
    pointerEvents: "none",
});

interface AiGuideComponentProps {
    isUserNearNPC: boolean;
    npcId: string;
    npcName: string;
}

const AiGuideComponent: React.FC<AiGuideComponentProps> = ({ isUserNearNPC, npcId, npcName: _npcName }) => {
    const dispatch = useAppDispatch();
    const webLLMState = useAppSelector((state) => state[WEB_LLM_PLUGIN_ID]);

    const onClickHandler = () => {
        dispatch(openModalWindow(`ai-chat-${npcId}`));
    };

    return (
        <>
            {isUserNearNPC && webLLMState.isReady && (
                <InteractionPrompt promptKey="k" onClickFunction={onClickHandler} />
            )}
            {isUserNearNPC && webLLMState.isLoading && (
                <LoadingBadge>
                    <Typography fontSize="10px">AI {webLLMState.loadingProgress}%</Typography>
                </LoadingBadge>
            )}
            <GridSizeImage src={HeroImage.src} />
        </>
    );
};

export default AiGuideComponent;
