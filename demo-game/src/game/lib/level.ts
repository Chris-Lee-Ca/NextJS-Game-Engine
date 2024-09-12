import { LevelInfo, AllLevelInfo } from "game-engine/redux/modules/levelModule";
import { MAIN_SPRITE_SHEET } from "./conts";

export const demoLevel_1: LevelInfo = {
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
    tilesHeight: 6,
    placements: [
        { id: "Character-main-character-3-2", coord: { x: 3, y: 2 }, type: "Character", itemName: "main character" },
        { id: "Tile-shrub-1-1", coord: { x: 1, y: 1 }, type: "Tile", itemName: "shrub" },
    ],
};

export const allDemoLevelInfo: AllLevelInfo = {
    demo_1: demoLevel_1,
};
