import { GRID } from "../lib/contstants";
import { Pixel } from "../types/general";

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
     * Calculates the actual pixel size of the grid after applying the scale factor.
     * @returns {number} - The pixel size of the grid.
     */
    static getGridSizeInPixel(): Pixel {
        // const scaleFactor = this.getScaleFactor();
        return GRID.SIZE * GRID.DEFAULT_SCALE_FACTOR;
    }
}

export default GridHelper;
