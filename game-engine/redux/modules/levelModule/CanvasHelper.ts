import { Placement, Vector2 } from "../../../types/general";
import GridHelper from "../../../helper/GridHelper";
import { LevelInfo } from "./types";

export class CanvasHelper {
    /**
     * Gets the default position offset of the canvas for placing the main character in its starting position.
     * @param {LevelInfo} levelInfo - The level information containing the main character's position.
     * @returns {Vector2} - The default position of the canvas.
     */
    static getCanvasDefaultOffset(levelInfo: LevelInfo): Vector2 {
        const mainCharacter = this.findMainCharacter(levelInfo);
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
     * @param {LevelInfo} levelInfo - The information about the level, including placements.
     * @returns {Placement} - The placement data for the main character.
     * @throws {Error} - If the main character is not defined in the level.
     */
    private static findMainCharacter(levelInfo: LevelInfo): Placement {
        const mainCharacter = levelInfo.placements.find(
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
     * @returns {Vector2} - The initial x and y offsets.
     */
    private static calculateInitialOffsets(gridSize: number): Vector2 {
        const xAxisOffset = gridSize / 2;
        const yAxisOffset = gridSize / 2;
        return { x: xAxisOffset, y: yAxisOffset };
    }

    /**
     * Adjusts the offsets based on the main character's starting position.
     * @param {Vector2} initialOffsets - The initial x and y offsets.
     * @param {Vector2} characterPosition - The position of the main character in the grid.
     * @param {number} gridSize - The actual size of the grid.
     * @returns {Vector2} - The adjusted x and y offsets.
     */
    private static adjustOffsetsForCharacterPosition(
        initialOffsets: Vector2,
        characterPosition: Vector2,
        gridSize: number
    ): Vector2 {
        const xAxisOffset = initialOffsets.x + characterPosition.x * gridSize;
        const yAxisOffset = initialOffsets.y + characterPosition.y * gridSize;
        return { x: xAxisOffset, y: yAxisOffset };
    }
}
