import { GRID, MAIN_SPRITE_SHEET } from "../conts";
import SpriteHelper from "./SpriteHelper";

class GridHelper {
    //TODO getSpriteSheetScaleFactor scale error and client side and server side result not align error happen when using this function
    /**
     * Retrieves the CSS custom property value for --scale-factor.
     * @returns {number} - The value of the CSS variable --scale-factor.
     */
    static getScaleFactor(): number {
        if (typeof window === "undefined" || !window.document) {
            return GRID.DEFAULT_SCALE_FACTOR;
        }
        const rootStyle = getComputedStyle(document.documentElement);
        const scaleFactor = parseFloat(rootStyle.getPropertyValue("--scale-factor").trim());
        return scaleFactor || GRID.DEFAULT_SCALE_FACTOR; // Fallback to default if CSS variable is unavailable
    }
    /**
     * Gets the actual pixel value based on the grid index and sprite sheet scale factor.
     * @param {number} index - The grid index.
     * @returns {string} - The actual pixel value as a string with 'px' unit.
     */
    static getActualPixel(index: number): string {
        return `${GRID.SIZE * index * SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}px`;
    }

    /**
     * Calculates the actual pixel size of the grid after applying the scale factor.
     * @returns {number} - The pixel size of the grid.
     */
    static getGridSizeInPixel(): number {
        // const scaleFactor = this.getScaleFactor();
        return GRID.SIZE * GRID.DEFAULT_SCALE_FACTOR;
    }
}

export default GridHelper;
