"use client";

import { Box, styled } from "@mui/material";
import AnimatedSprite from "@/game/components/Sprite/AnimatedSprite";
import React from "react";
import { Animations } from "@/game/types/general";
import { HERO_SPRITE_SHEET } from "@/game/lib/conts";
import { useAppSelector } from "@/game/redux/hooks";
import AnimationHelper from "@/game/lib/helper/AnimationHelper";
import SpriteHelper from "@/game/lib/helper/SpriteHelper";

const CharacterBox = styled(Box)({
    zIndex: 99,
    position: "absolute",
});

interface MainCharacterProps {}
const MainCharacter: React.FC<MainCharacterProps> = () => {
    const playerKeyboardEvent = useAppSelector((state) => state.player.playerKeyboardEvent);

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
            <AnimatedSprite
                spriteSheetInfo={HERO_SPRITE_SHEET}
                imageOffset={{
                    x: HERO_SPRITE_SHEET.MAIN_CHARACTER_SECTION_X_OFFSET,
                    y: HERO_SPRITE_SHEET.MAIN_CHARACTER_SECTION_Y_OFFSET,
                }}
                scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(HERO_SPRITE_SHEET)}
                animations={animations}
                currentAnimation={AnimationHelper.animationSelector(playerKeyboardEvent)}
            />
        </CharacterBox>
    );
};

export default MainCharacter;
