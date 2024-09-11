import { Vector2 } from "../types/general";
import GridHelper from "./GridHelper";

class Converter {
    public static coordToVector(gridPosition: Vector2): Vector2 {
        const gridPixelSize = GridHelper.getGridSizeInPixel();
        return {
            x: gridPixelSize / 2 + gridPosition.x * gridPixelSize,
            y: gridPixelSize / 2 + gridPosition.y * gridPixelSize,
        };
    }
    public static vectorToCoord(pixelPosition: Vector2): Vector2 {
        const gridPixelSize = GridHelper.getGridSizeInPixel();
        return {
            x: pixelPosition.x % gridPixelSize,
            y: pixelPosition.y % gridPixelSize,
        };
    }
}

export default Converter;
