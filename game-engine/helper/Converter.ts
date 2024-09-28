import { Coordinate, Vector2 } from "../types/general";
import GridHelper from "./GridHelper";

class Converter {
    public static coordToVector(coord: Coordinate): Vector2 {
        const gridPixelSize = GridHelper.getGridSizeInPixel();
        return {
            x: coord.x * gridPixelSize,
            y: coord.y * gridPixelSize,
        };
    }
    public static vectorToCoord(vector: Vector2): Coordinate {
        const gridPixelSize = GridHelper.getGridSizeInPixel();
        return {
            x: Math.floor(vector.x / gridPixelSize),
            y: Math.floor(vector.y / gridPixelSize),
        };
    }
}

export default Converter;
