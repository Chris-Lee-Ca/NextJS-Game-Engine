import spriteSheet from "@/game/assets/spritesheet.png";
import heroSpriteSheet from "@/game/assets/hero.png";
import { SpriteSheetInfo } from "@/game/types/general";

export const GRID = {
    SIZE: 16,
};

export const MAIN_SPRITE_SHEET: SpriteSheetInfo = {
    SRC: spriteSheet.src,
    WIDTH: 16,
    HEIGHT: 16,
    BORDER: 0,
    SPACING: 0,
    GREEN_ISLAND_SECTION_X_OFFSET: 80.3,
    GREEN_ISLAND_SECTION_Y_OFFSET: 161.4,
    GREEN_ISLAND_CLIFF_SECTION_X_OFFSET: 70.3,
    GREEN_ISLAND_CLIFF_SECTION_Y_OFFSET: 14.7,
    SCALE_FACTOR: 4,
};
export const HERO_SPRITE_SHEET: SpriteSheetInfo = {
    SRC: heroSpriteSheet.src,
    WIDTH: 32,
    HEIGHT: 32,
    BORDER: 0,
    SPACING: 0,
    MAIN_CHARACTER_SECTION_X_OFFSET: 0,
    MAIN_CHARACTER_SECTION_Y_OFFSET: 0,
    SCALE_FACTOR: 3,
};

export const MAIN_CHARACTER_MOVING_SPEED = 7;

export const CUSTOM_STYLE = {
    COLOR: {
        MAIN_BLUE: "rgb(88,180,252)",
    },
    BORDER: {
        MAP_BORDER: `3px solid black`,
        GRID_BORDER: `1px solid grey`,
    },
};
