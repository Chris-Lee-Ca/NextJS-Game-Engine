import spriteSheet from "@/game/assets/spritesheet.png";
import heroSpriteSheet from "@/game/assets/hero.png";
import { SpriteSheetInfo } from "game-engine/types/general";

export const GAME_SETTING = {
    TARGET_FPS: 60,
};

export const MAIN_SPRITE_SHEET: SpriteSheetInfo = {
    ID: "MAIN_SPRITE_SHEET",
    SRC: spriteSheet.src,
    WIDTH: 16,
    HEIGHT: 16,
    BORDER: 0,
    SPACING: 0,
    GREEN_ISLAND_SECTION_X_OFFSET: 80.3,
    GREEN_ISLAND_SECTION_Y_OFFSET: 161.4,
    GREEN_ISLAND_CLIFF_SECTION_X_OFFSET: 70.3,
    GREEN_ISLAND_CLIFF_SECTION_Y_OFFSET: 14.7,
    SHRUB_SECTION_X_OFFSET: 64,
    SHRUB_SECTION_Y_OFFSET: 63.9,
    ADJUST_SCALE_FACTOR: 1,
};
export const HERO_SPRITE_SHEET: SpriteSheetInfo = {
    ID: "HERO_SPRITE_SHEET",
    SRC: heroSpriteSheet.src,
    WIDTH: 32,
    HEIGHT: 32,
    BORDER: 0,
    SPACING: 0,
    MAIN_CHARACTER_SECTION_X_OFFSET: 2.5,
    MAIN_CHARACTER_SECTION_Y_OFFSET: 7.5,
    ADJUST_SCALE_FACTOR: 1.3,
};

export const CUSTOM_STYLE = {
    COLOR: {
        MAIN_BLUE: "rgb(88,180,252)",
    },
    BORDER: {
        MAP_BORDER: `3px solid black`,
        GRID_BORDER: `1px solid grey`,
    },
};
