import { Vector2 } from "../types/general";
import GridHelper from "./GridHelper";

class Converter {
    public static coordToVector(coord: Vector2): Vector2 {
        const gridPixelSize = GridHelper.getGridSizeInPixel();
        return {
            x: coord.x * gridPixelSize,
            y: coord.y * gridPixelSize,
        };
    }
    public static vectorToCoord(vector: Vector2): Vector2 {
        const gridPixelSize = GridHelper.getGridSizeInPixel();
        return {
            x: vector.x % gridPixelSize,
            y: vector.y % gridPixelSize,
        };
    }
}

export default Converter;
