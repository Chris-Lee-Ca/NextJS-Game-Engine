"use client";

import React from "react";
import { MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import SpriteHelper from "game-engine/helper/SpriteHelper";
import Sprite from "game-engine/components/Sprite/Sprite";

interface FlowersComponentProps {}
const FlowersComponent: React.FC<FlowersComponentProps> = (_props) => {
    return (
        <Sprite
            spriteSheetInfo={MAIN_SPRITE_SHEET}
            imageOffset={{
                x: MAIN_SPRITE_SHEET.FLOWERS_SECTION.X_OFFSET,
                y: MAIN_SPRITE_SHEET.FLOWERS_SECTION.Y_OFFSET,
            }}
            scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
        />
    );
};

export default FlowersComponent;
