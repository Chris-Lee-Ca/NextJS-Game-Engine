import { Level } from "@/game/types/general";
import { MAIN_SPRITE_SHEET } from "./conts";

export const demoLevel: Level = {
    theme: {
        backgroundSpriteSheetInfo: MAIN_SPRITE_SHEET,
        imageOffset: {
            x: MAIN_SPRITE_SHEET.GREEN_ISLAND_SECTION_X_OFFSET,
            y: MAIN_SPRITE_SHEET.GREEN_ISLAND_SECTION_Y_OFFSET,
        },
        cliffSpriteSheetInfo: MAIN_SPRITE_SHEET,
        cliffImageOffset: {
            x: MAIN_SPRITE_SHEET.GREEN_ISLAND_CLIFF_SECTION_X_OFFSET,
            y: MAIN_SPRITE_SHEET.GREEN_ISLAND_CLIFF_SECTION_Y_OFFSET,
        },
    },
    tilesWidth: 10,
    tilesHeight: 10,
    placements: [],
};
