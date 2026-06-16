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

const pulse = keyframes`
    0%, 100% { transform: translateX(-50%) scale(1); }
    50%       { transform: translateX(-50%) scale(1.18); }
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
}

const MainCharacterComponent: React.FC<MainCharacterComponentProps> = ({ facing, position, bound }) => {
    const devMode = useAppSelector((state) => state.game.devMode);
    // isRunning drives both the speed in MainCharacter.update() and this visual indicator.
    const isRunning = useAppSelector((state) => state.run.isRunning);

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
        </CharacterBox>
    );
};

export default MainCharacterComponent;
