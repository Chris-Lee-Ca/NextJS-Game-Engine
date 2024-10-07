import spriteSheet from "@/game/assets/spriteSheet/mainSpriteSheet.png";
import heroSpriteSheet from "@/game/assets/spriteSheet/hero.png";
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
    ADJUST_SCALE_FACTOR: 1,
    GREEN_ISLAND_SECTION: {
        X_OFFSET: 80.3,
        Y_OFFSET: 161.4,
    },
    GREEN_ISLAND_CLIFF_SECTION: {
        X_OFFSET: 70.3,
        Y_OFFSET: 14.7,
    },
    SHRUB_SECTION: {
        X_OFFSET: 64,
        Y_OFFSET: 63.9,
    },
    FLOWERS_SECTION: {
        X_OFFSET: 95,
        Y_OFFSET: 32.5,
    },
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
        MAIN_WHITE: "white",
        MAIN_BLACK: "black",
        MAIN_PANEL_COLOR: "rgb(3, 11, 30)", //blue grey
        MAIN_TEXT_COLOR: "white",
        MAIN_TEXT_BACKGROUND_COLOR: "rgb(28, 47, 92)",
        MAIN_PAPER_COLOR: "#e4cc96",
        SECONDARY_PAPER_COLOR: '#eee0c0',
    },
    BORDER: {
        MAP_BORDER: `3px solid black`,
        GRID_BORDER: `1px solid grey`,
        PREVIEW_OBJECT_BORDER: `2px solid white`,
    },
    SIZE: {
        STATUS_BAR_HEIGHT: 50,
        ACTION_BAR_HEIGHT: 50,
    },
};

export const EDIT_MODE_LEVEL_NAME = "edit-mode-level";
