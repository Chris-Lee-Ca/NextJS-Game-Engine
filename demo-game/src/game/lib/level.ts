import { LevelInfo, AllLevelInfo } from "game-engine/extensions/plugins/levelPlugin";
import { MAIN_SPRITE_SHEET } from "./conts";
import { Placement } from "game-engine/types/general";

export const defaultLevelTheme = {
    backgroundSpriteSheetInfo: MAIN_SPRITE_SHEET,
    imageOffset: {
        x: MAIN_SPRITE_SHEET.GREEN_ISLAND_SECTION.X_OFFSET,
        y: MAIN_SPRITE_SHEET.GREEN_ISLAND_SECTION.Y_OFFSET,
    },
    cliffSpriteSheetInfo: MAIN_SPRITE_SHEET,
    cliffImageOffset: {
        x: MAIN_SPRITE_SHEET.GREEN_ISLAND_CLIFF_SECTION.X_OFFSET,
        y: MAIN_SPRITE_SHEET.GREEN_ISLAND_CLIFF_SECTION.Y_OFFSET,
    },
};
export const demoLevel_1: LevelInfo = {
    levelTitle: "demo-level-1",
    theme: defaultLevelTheme,
    tilesWidth: 10,
    tilesHeight: 6,
    placements: [
        { id: "PickUp-resume-2-2", coord: { x: 2, y: 2 }, type: "PickUp", itemName: "resume" },
        { id: "Tile-flowers-1-2", coord: { x: 1, y: 2 }, type: "Tile", itemName: "flowers" },
        { id: "Tile-shrub-1-1", coord: { x: 1, y: 1 }, type: "Tile", itemName: "shrub" },
        { id: "Tile-signage-2-3", coord: { x: 2, y: 3 }, type: "Tile", itemName: "signage", signageType: "intro"} as Placement,
        { id: "Tile-signage-2-5", coord: { x: 2, y: 5 }, type: "Tile", itemName: "signage", signageType: "experience"} as Placement,
        { id: "Character-main-character-3-2", coord: { x: 3, y: 2 }, type: "Character", itemName: "main character" }, // main character must be the last item of the list, such that it draw on the canvas last and over all other item.
    ],
};

export const allDemoLevelInfo: AllLevelInfo = {
    demo_1: demoLevel_1,
};
