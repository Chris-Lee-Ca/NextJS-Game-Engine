import { Position } from "../types/general";
import GridHelper from "./GridHelper";

class PositionConverter {
    public static gridToPixel(gridPosition: Position): Position {
        const gridPixelSize = GridHelper.getGridSizeInPixel();
        return {
            x: gridPixelSize / 2 + gridPosition.x * gridPixelSize,
            y: gridPixelSize / 2 + gridPosition.y * gridPixelSize,
        };
    }
    public static pixelToGrid(pixelPosition: Position): Position {
        const gridPixelSize = GridHelper.getGridSizeInPixel();
        return {
            x: pixelPosition.x % gridPixelSize,
            y: pixelPosition.y % gridPixelSize,
        };
    }
}

export default PositionConverter;
