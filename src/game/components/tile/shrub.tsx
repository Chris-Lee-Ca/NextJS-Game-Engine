"use client";

import React from "react";
import Sprite from "../Sprite/Sprite";
import { MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import SpriteHelper from "@/game/lib/helper/SpriteHelper";

interface ShrubProps {}
const Shrub: React.FC<ShrubProps> = () => {
    return (
        <Sprite
            spriteSheetInfo={MAIN_SPRITE_SHEET}
            imageOffset={{
                x: MAIN_SPRITE_SHEET.SHRUB_SECTION_X_OFFSET,
                y: MAIN_SPRITE_SHEET.SHRUB_SECTION_Y_OFFSET,
            }}
            scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
        />
    );
};

export default Shrub;
