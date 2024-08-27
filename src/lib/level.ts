import { Level } from "@/types/general";
import { SPRITE_SHEET, SPRITE_SHEET_SRC } from "./conts";

export const demoLevel: Level = {
    theme: {
        imageSrc: SPRITE_SHEET_SRC,
        imageOffset: {
            x: SPRITE_SHEET.GREEN_ISLAND_SECTION_X_OFFSET,
            y: SPRITE_SHEET.GREEN_ISLAND_SECTION_Y_OFFSET,
        },
        cliffImageSrc: SPRITE_SHEET_SRC,
        cliffImageOffset: {
            x: SPRITE_SHEET.GREEN_ISLAND_CLIFF_SECTION_X_OFFSET,
            y: SPRITE_SHEET.GREEN_ISLAND_CLIFF_SECTION_Y_OFFSET,
        },
    },
    tilesWidth: 10,
    tilesHeight: 10,
    placements: [],
};
