"use client";

import React from "react";
import Sprite from "../Sprite/Sprite";
import { MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import { getSpriteSheetScaleFactor } from "@/game/lib/helper";

interface ShrubProps {}
const Shrub: React.FC<ShrubProps> = () => {
    return (
        <Sprite
            spriteSheetInfo={MAIN_SPRITE_SHEET}
            imageOffset={{
                x: MAIN_SPRITE_SHEET.SHRUB_SECTION_X_OFFSET,
                y: MAIN_SPRITE_SHEET.SHRUB_SECTION_Y_OFFSET,
            }}
            scaleFactor={getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
        />
    );
};

export default Shrub;
