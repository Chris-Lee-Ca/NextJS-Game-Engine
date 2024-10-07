import GridHelper from "../../../helper/GridHelper";
import { Vector2 } from "../../../types/general";
import { DIRECTION_COMMAND_MAPPING } from "./constants";
import { DirectionCommand } from "./types";

export const getCharacterOffset = (
    directionCommand: DirectionCommand,
    movingSpeed: number,
    deltaTime: number
): Vector2 => {
    const movementDirection = DIRECTION_COMMAND_MAPPING[directionCommand];
    const gridSize = GridHelper.getGridSizeInPixel();
    const movementPerLoop = (movingSpeed * deltaTime) / gridSize;
    return {
        x: movementDirection.x * movementPerLoop,
        y: movementDirection.y * movementPerLoop,
    };
};
