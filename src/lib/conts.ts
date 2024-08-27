import spriteSheet from "@/assets/spritesheet.png";

export const GRID = {
    SIZE: 16,
};

export const SPRITE_SHEET = {
    WIDTH: 16,
    HEIGHT: 16.4,
    BORDER: 0,
    SPACING: 0,
    CHARACTER_SECTION_Y_OFFSET: 383.9,
    CHARACTER_SECTION_X_OFFSET: 64,
    GREEN_ISLAND_SECTION_X_OFFSET: 80.3,
    GREEN_ISLAND_SECTION_Y_OFFSET: 161.4,
    GREEN_ISLAND_CLIFF_SECTION_X_OFFSET: 70.3,
    GREEN_ISLAND_CLIFF_SECTION_Y_OFFSET: 14.7,
};
export const SCALE_FACTOR = 4;

export const MAIN_CHARACTER_MOVING_SPEED = 7;

export const SPRITE_SHEET_SRC = spriteSheet.src;

export const CUSTOM_STYLE = {
    COLOR: {
        MAIN_BLUE: "rgb(88,180,252)",
    },
    BORDER: {
        MAP_BORDER: `3px solid black`,
    },
};
