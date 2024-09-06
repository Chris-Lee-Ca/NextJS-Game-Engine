import { Position, SpriteSheetInfo } from "@/game/types/general";
import { GRID } from "../conts";
import GridHelper from "./GridHelper";

class SpriteHelper {
    /**
     * Converts sprite grid position to image position on the sprite sheet.
     * @param {number} row - The row in the sprite sheet grid.
     * @param {number} col - The column in the sprite sheet grid.
     * @param {SpriteSheetInfo} spriteSheetInfo - Information about the sprite sheet.
     * @param {Object} imageOffset - The x and y offsets for the image.
     * @returns {Position} - The x and y position on the image.
     */
    static spritePositionToImagePosition(
        row: number,
        col: number,
        spriteSheetInfo: SpriteSheetInfo,
        imageOffset: { x: number; y: number }
    ): Position {
        return {
            x: imageOffset.x + spriteSheetInfo.BORDER + col * spriteSheetInfo.WIDTH,
            y: imageOffset.y + spriteSheetInfo.BORDER + row * (spriteSheetInfo.SPACING + spriteSheetInfo.HEIGHT),
        };
    }

    /**
     * Calculates the scale factor for the sprite sheet based on the grid size and sprite sheet dimensions.
     * @param {SpriteSheetInfo} spriteSheetInfo - Information about the sprite sheet.
     * @returns {number} - The scale factor for the sprite sheet.
     * @throws {Error} - If the sprite sheet info width and height are not equal.
     */
    static getSpriteSheetScaleFactor(spriteSheetInfo: SpriteSheetInfo): number {
        if (spriteSheetInfo.WIDTH !== spriteSheetInfo.HEIGHT) {
            throw new Error(
                `Error: this engine does not yet support sprite sheet ${spriteSheetInfo.ID} unless their items width and height are equal`
            );
        }
        return (GridHelper.getGridSizeInPixel() / spriteSheetInfo.WIDTH) * spriteSheetInfo.ADJUST_SCALE_FACTOR;
    }
}

export default SpriteHelper;
