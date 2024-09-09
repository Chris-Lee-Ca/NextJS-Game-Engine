import { GRID } from "../lib/contstants";
import { SpriteSheetInfo } from "../types/general";
import SpriteHelper from "./SpriteHelper";

//TODO GridHelper should not rely on anything from game {GRID}
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

    //TODO confirm is this function still useful in the future, seems like getGridSizeInPixel() * index can replace this function.
    /**
     * Gets the actual pixel value based on the grid index and sprite sheet scale factor.
     * @param {number} index - The grid index.
     * @param {SpriteSheetInfo} spriteSheetInfo - The sprite sheet information.
     * @returns {string} - The actual pixel value as a string with 'px' unit.
     */
    static getActualPixel(index: number, spriteSheetInfo: SpriteSheetInfo): string {
        return `${GRID.SIZE * index * SpriteHelper.getSpriteSheetScaleFactor(spriteSheetInfo)}px`;
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
