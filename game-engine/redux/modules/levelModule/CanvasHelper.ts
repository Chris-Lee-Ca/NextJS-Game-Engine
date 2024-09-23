import { Vector2 } from "../../../types/general";
import GridHelper from "../../../helper/GridHelper";
import { LevelInfo } from "./types";
import GameObject from "../../../components/GameObject";

export class CanvasHelper {
    static getCanvasBaseOffset(): Vector2 {
        const gridSize = GridHelper.getGridSizeInPixel();
        const xAxisOffset = gridSize / 2;
        const yAxisOffset = gridSize / 2;
        return { x: xAxisOffset, y: yAxisOffset };
    }

    static getCanvasOffset(mainCharacter: GameObject) {
        return {
            x: mainCharacter.position.x,
            y: mainCharacter.position.y,
        };
    }

    /**
     * Finds the main character id in the level information placements.
     * @param {LevelInfo} levelInfo - The information about the level, including placements.
     * @returns {string} - The placement id for the main character.
     * @throws {Error} - If the main character is not defined in the level.
     */
    static findMainCharacterId(levelInfo: LevelInfo): string {
        const mainCharacterPlacement = levelInfo.placements.find(
            (placement) => placement.type === "Character" && placement.itemName === "main character"
        );
        if (typeof mainCharacterPlacement === "undefined") {
            throw new Error("Error: main character is not defined in the current level");
        }
        return mainCharacterPlacement.id;
    }
}
