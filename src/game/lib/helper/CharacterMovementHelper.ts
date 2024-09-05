import { Direction, Level, Placement, Position } from "@/game/types/general";
import GridHelper from "./GridHelper";
import { MAIN_CHARACTER_MOVING_SPEED } from "../conts";

class CharacterMovementHelper {
    /**
     * Calculates the actual pixel movement for the main character based on the given direction.
     * @param {Direction} movementDirection - The direction in which the main character is moving.
     * @returns {Position} - The actual pixel movement for the main character.
     */
    static getCharacterMovementInPixels(movementDirection: Direction): Position {
        const gridSize = GridHelper.getGridSizeInPixel();
        const movementScaleFactor = MAIN_CHARACTER_MOVING_SPEED / gridSize;
        return { x: movementDirection.x * movementScaleFactor, y: movementDirection.y * movementScaleFactor };
    }

    /**
     * Gets the default position offset of the canvas for placing the main character in its starting position.
     * @param {Level} levelInformation - The level information containing the main character's position.
     * @returns {Position} - The default position of the canvas.
     */
    static getCanvasDefaultOffset(levelInformation: Level): Position {
        const mainCharacter = this.findMainCharacter(levelInformation);
        const gridSize = GridHelper.getGridSizeInPixel();

        const initialOffsets = this.calculateInitialOffsets(gridSize);
        const adjustedOffsets = this.adjustOffsetsForCharacterPosition(
            initialOffsets,
            mainCharacter.position,
            gridSize
        );

        return {
            x: adjustedOffsets.x,
            y: adjustedOffsets.y,
        };
    }

    /**
     * Finds the main character in the level information placements.
     * @param {Level} levelInformation - The information about the level, including placements.
     * @returns {Placement} - The placement data for the main character.
     * @throws {Error} - If the main character is not defined in the level.
     */
    private static findMainCharacter(levelInformation: Level): Placement {
        const mainCharacter = levelInformation.placements.find(
            (placement) => placement.type === "Character" && placement.itemName === "main character"
        );
        if (typeof mainCharacter === "undefined") {
            throw new Error("Error: main character is not defined in the current level");
        }
        return mainCharacter;
    }

    /**
     * Calculates the initial offsets to center the main character on the grid at position {x: 0, y: 0}.
     * @param {number} gridSize - The actual size of the grid.
     * @returns {Position} - The initial x and y offsets.
     */
    private static calculateInitialOffsets(gridSize: number): Position {
        const xAxisOffset = gridSize / 2;
        const yAxisOffset = gridSize / 2;
        return { x: xAxisOffset, y: yAxisOffset };
    }

    /**
     * Adjusts the offsets based on the main character's starting position.
     * @param {Position} initialOffsets - The initial x and y offsets.
     * @param {Position} characterPosition - The position of the main character in the grid.
     * @param {number} gridSize - The actual size of the grid.
     * @returns {Position} - The adjusted x and y offsets.
     */
    private static adjustOffsetsForCharacterPosition(
        initialOffsets: Position,
        characterPosition: Position,
        gridSize: number
    ): Position {
        const xAxisOffset = initialOffsets.x + characterPosition.x * gridSize;
        const yAxisOffset = initialOffsets.y + characterPosition.y * gridSize;
        return { x: xAxisOffset, y: yAxisOffset };
    }
}

export default CharacterMovementHelper;
