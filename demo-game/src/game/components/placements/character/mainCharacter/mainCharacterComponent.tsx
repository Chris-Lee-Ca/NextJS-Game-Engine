"use client";

import { Box, styled } from "@mui/material";
import AnimatedSprite from "game-engine/components/Sprite/AnimatedSprite";
import React from "react";
import { Animations, Vector2 } from "game-engine/types/general";
import { HERO_SPRITE_SHEET } from "@/game/lib/conts";
import AnimationHelper from "@/game/helper/AnimationHelper";
import SpriteHelper from "game-engine/helper/SpriteHelper";
import { Facing } from "game-engine/extensions/modules/MainCharacterControlModule";
import Rectangle from "game-engine/components/Rectangle";
import Bound from "@/game/components/Bound";
import { useAppSelector } from "@/game/redux/hooks";

const CharacterBox = styled(Box)({});

interface MainCharacterComponentProps {
    facing: Facing;
    position: Vector2;
    bound: Rectangle;
}

const MainCharacterComponent: React.FC<MainCharacterComponentProps> = ({ facing, position, bound }) => {
    const devMode = useAppSelector((state) => state.game.devMode);
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
