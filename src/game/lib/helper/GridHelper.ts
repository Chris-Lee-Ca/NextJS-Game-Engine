import { GRID, MAIN_SPRITE_SHEET } from "../conts";
import SpriteHelper from "./SpriteHelper";

class GridHelper {
    /**
     * Gets the actual pixel value based on the grid index and sprite sheet scale factor.
     * @param {number} index - The grid index.
     * @returns {string} - The actual pixel value as a string with 'px' unit.
     */
    static getActualPixel(index: number): string {
        return `${GRID.SIZE * index * SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}px`;
    }

    //TODO, replace scale_factor to a variable
    /**
     * Calculates the actual pixel size of the grid after applying the scale factor.
     * @returns {number} - The pixel size of the grid.
     */
    static getGridSizeInPixel(): number {
        return GRID.SIZE * GRID.SCALE_FACTOR;
    }
}

export default GridHelper;
