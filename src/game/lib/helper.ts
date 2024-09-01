import { SpriteSheetInfo } from "@/game/types/general";
import { GRID, MAIN_SPRITE_SHEET } from "./conts";

export const animationSelector = (key: string): string => {
    switch (key) {
        case "up":
            return "walkUp";
        case "down":
            return "walkDown";
        case "left":
            return "walkLeft";
        case "right":
            return "walkRight";
        default:
            return "idleDown";
    }
};

export const spritePositionToImagePosition = (
    row: number,
    col: number,
    spriteSheetInfo: SpriteSheetInfo,
    imageOffset: { x: number; y: number }
) => {
    return {
        x: imageOffset.x + spriteSheetInfo.BORDER + col * spriteSheetInfo.WIDTH,
        y: imageOffset.y + spriteSheetInfo.BORDER + row * (spriteSheetInfo.SPACING + spriteSheetInfo.HEIGHT),
    };
};

/**
 * A function for getting the actual pixel offset based on the sprite sheet's scale factor and grid size.
 * @param index number of grid away from top left corner.
 * @returns actual pixel
 */
export const getActualPixel = (index: number): string => {
    return `${GRID.SIZE * index * getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}px`;
};

/**
 * A function for calculating the actual size of the grid by multiplying the grid size by a given scale factor.
 * The scale factor can vary depending on the screen size or other factors.
 *
 * @param {number} scaleFactor - The scaling factor to adjust the grid size, typically based on screen dimensions.
 * @returns {number} the actual size of the grid after applying the scale factor.
 */
export const getGridActualSize = (): number => {
    return GRID.SIZE * GRID.SCALE_FACTOR;
};

export const getSpriteSheetScaleFactor = (spriteSheetInfo: SpriteSheetInfo): number => {
    if (spriteSheetInfo.WIDTH !== spriteSheetInfo.HEIGHT) {
        throw new Error(
            `Warning: this engine does not yet support sprite sheet ${spriteSheetInfo.ID} unless their items width and height are equal`
        );
    }
    return GRID.SIZE * (GRID.SCALE_FACTOR / spriteSheetInfo.WIDTH) * spriteSheetInfo.ADJUST_SCALE_FACTOR;
};
