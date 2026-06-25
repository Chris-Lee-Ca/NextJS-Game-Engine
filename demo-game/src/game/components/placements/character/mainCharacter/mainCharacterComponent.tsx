"use client";

import { Box, styled } from "@mui/material";
import { keyframes } from "@mui/system";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AnimatedSprite from "game-engine/components/Sprite/AnimatedSprite";
import React from "react";
import { Animations, Vector2 } from "game-engine/types/general";
import { HERO_SPRITE_SHEET } from "@/game/lib/conts";
import AnimationHelper from "@/game/helper/AnimationHelper";
import SpriteHelper from "game-engine/helper/SpriteHelper";
import { Facing } from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import Rectangle from "game-engine/components/Rectangle";
import Bound from "@/game/components/Bound";
import { useAppSelector } from "@/game/redux/hooks";
import { DOUBLE_TAP_RUN_PLUGIN_ID } from "game-engine/extensions/plugins/doubleTapRunPlugin";

const pulse = keyframes`
    0%, 100% { transform: translateX(-50%) scale(1); }
    50%       { transform: translateX(-50%) scale(1.18); }
`;

// Brief red-flash + horizontal shake triggered on each new knockback hit.
const hurtFlash = keyframes`
    0%   { filter: brightness(1)   saturate(1);   transform: translateX(0); }
    15%  { filter: brightness(3.5) saturate(0.2) sepia(1) hue-rotate(310deg); transform: translateX(-5px); }
    35%  { filter: brightness(2.5) saturate(0.2) sepia(1) hue-rotate(310deg); transform: translateX(4px); }
    55%  { filter: brightness(1.8) saturate(0.5) sepia(0.6) hue-rotate(310deg); transform: translateX(-3px); }
    75%  { filter: brightness(1.3) saturate(0.8); transform: translateX(2px); }
    100% { filter: brightness(1)   saturate(1);   transform: translateX(0); }
`;

const CharacterBox = styled(Box)({
    position: "relative",
});

const RunPill = styled(Box)({
    position: "absolute",
    top: "-26px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.65)",
    borderRadius: "10px",
    padding: "3px 7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    pointerEvents: "none",
    animation: `${pulse} 0.9s ease-in-out infinite`,
});

interface MainCharacterComponentProps {
    facing: Facing;
    position: Vector2;
    bound: Rectangle;
    isKnockedBack: boolean;
    hurtKey: number;
}

const MainCharacterComponent: React.FC<MainCharacterComponentProps> = ({
    facing,
    position,
    bound,
    isKnockedBack,
    hurtKey,
}) => {
    const devMode = useAppSelector((state) => state.game.devMode);
    // isRunning drives both the speed in MainCharacter.update() and this visual indicator.
    const isRunning = useAppSelector((state) => state[DOUBLE_TAP_RUN_PLUGIN_ID].isRunning);

    const animations: Animations = {
        idleDown: [[0, 0]],
        walkDown: [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        walkRight: [
            [1, 0],
            [1, 1],
            [1, 2],
            [1, 3],
        ],
        walkUp: [
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
        ],
        walkLeft: [
            [3, 0],
            [3, 1],
            [3, 2],
            [3, 3],
        ],
    };

    return (
        <CharacterBox>
            {devMode && <Bound position={position} rectangle={bound} />}
            {isRunning && (
                <RunPill>
                    <DirectionsRunIcon sx={{ fontSize: 16, color: "#fff" }} />
                </RunPill>
            )}
            {/*
             * The key prop on this Box forces React to unmount+remount the element on
             * each new knockback hit, restarting the CSS animation from frame 0.
             */}
            <Box
                key={hurtKey}
                sx={
                    isKnockedBack
                        ? { animation: `${hurtFlash} 0.22s ease-out forwards` }
                        : undefined
                }
            >
                <AnimatedSprite
                    spriteSheetInfo={HERO_SPRITE_SHEET}
                    imageOffset={{
                        x: HERO_SPRITE_SHEET.MAIN_CHARACTER_SECTION_X_OFFSET,
                        y: HERO_SPRITE_SHEET.MAIN_CHARACTER_SECTION_Y_OFFSET,
                    }}
                    scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(HERO_SPRITE_SHEET)}
                    animations={animations}
                    currentAnimation={AnimationHelper.animationSelector(facing)}
                />
            </Box>
        </CharacterBox>
    );
};

export default React.memo(MainCharacterComponent);
