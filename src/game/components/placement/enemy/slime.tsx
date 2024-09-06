"use client";

import React from "react";
import AnimatedSprite from "@/game/components/Sprite/AnimatedSprite";
import { MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import SpriteHelper from "@/game/lib/helper/SpriteHelper";

interface SlimeProps {}
const Slime: React.FC<SlimeProps> = () => {
    return (
        <AnimatedSprite
            spriteSheetInfo={MAIN_SPRITE_SHEET}
            imageOffset={{
                x: MAIN_SPRITE_SHEET.SHRUB_SECTION_X_OFFSET,
                y: MAIN_SPRITE_SHEET.SHRUB_SECTION_Y_OFFSET,
            }}
            scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
            animations={{}}
            currentAnimation={""}
        />
    );
};

export default Slime;
