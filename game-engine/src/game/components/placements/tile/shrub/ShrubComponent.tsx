"use client";

import React from "react";
import { MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import SpriteHelper from "@/gameEngine/helper/SpriteHelper";
import Sprite from "@/gameEngine/components/Sprite/Sprite";

interface ShrubComponentProps {
    x: number;
    y: number;
}
const ShrubComponent: React.FC<ShrubComponentProps> = (props) => {
    return (
        <Sprite
            spriteSheetInfo={MAIN_SPRITE_SHEET}
            imageOffset={{
                x: MAIN_SPRITE_SHEET.SHRUB_SECTION_X_OFFSET + props.x,
                y: MAIN_SPRITE_SHEET.SHRUB_SECTION_Y_OFFSET + props.y,
            }}
            scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
        />
    );
};

export default ShrubComponent;
