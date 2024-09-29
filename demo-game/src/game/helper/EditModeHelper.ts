import { Placement } from "game-engine/types/general";
import { EditModeLevelInfo, PreviewObjectPlacement } from "../types/general";
import { CanvasHelper, LevelInfo } from "game-engine/redux/modules/levelModule";
import { defaultLevelTheme } from "../lib/level";
import ObjectPool from "game-engine/core/ObjectPool";

class EditModeHelper {
    static isPreviewObject(placement: PreviewObjectPlacement): boolean {
        return placement.itemName === "preview object";
    }

    /**
     * A function for creating the default edit mode level info
     *
     * @param levelInfo current level info
     * @returns default edit mode level info
     */
    static editModeLevelInfoInitializr(levelInfo: LevelInfo): EditModeLevelInfo {
        const mainCharacterPlacement = CanvasHelper.findMainCharacter(levelInfo);
        const mainCharacter = ObjectPool.get(mainCharacterPlacement.id);
        return {
            levelTitle: "default-game-level-title",
            theme: defaultLevelTheme,
            tilesWidth: 3,
            tilesHeight: 3,
            placements: [
                {
                    id: `Tile-preview-object-${mainCharacter!.coord.x}-${mainCharacter!.coord.y}`,
                    coord: mainCharacter!.coord,
                    type: "Tile",
                    itemName: "preview object",
                    previewObjectItem: {
                        type: "Character",
                        objectItemName: "main character",
                        avatar: undefined,
                    },
                },
                {
                    id: `Character-main-character-${mainCharacter!.coord.x}-${mainCharacter!.coord.y}`,
                    coord: mainCharacter!.coord,
                    type: "Character",
                    itemName: "main character",
                },
            ],
        };
    }

    /**
     * A function for adding a preview object placement to an existing placements array.
     *
     * Rule:
     * 1. If the new placement coordinates overlap with an existing placement, replace the current placement.
     * 2. If there are two 'main character' preview object placements, remove the older one.
     *
     * @param oldPlacements - The array of placements containing the current preview object placements.
     * @param placement - The preview object placement to be inserted.
     * @returns The updated placements array with the inserted preview object placement.
     */
    static placementsInsertor(
        oldPlacements: PreviewObjectPlacement[],
        placement: PreviewObjectPlacement
    ): PreviewObjectPlacement[] {
        const coordToString = (coord: { x: number; y: number }) => `${coord.x},${coord.y}`;

        const updatedPlacements = [...oldPlacements];
        const currentCoord = coordToString(placement.coord);

        // Check if the new placement is putting on existing placement
        const existingIndex = updatedPlacements.findIndex(
            (p) => this.isPreviewObject(p) && p !== placement && coordToString(p.coord) === currentCoord
        );
        if (existingIndex !== -1) {
            // Replace the item at the existing coordinate
            updatedPlacements[existingIndex] = placement;
        } else {
            // Insert it at the first place;
            updatedPlacements.unshift(placement);
        }

        // Check if there are 2 'main character'
        if (placement.previewObjectItem.objectItemName === "main character") {
            const mainCharacterIndex = updatedPlacements.findIndex(
                (p) =>
                    this.isPreviewObject(p) &&
                    p !== placement &&
                    p.previewObjectItem.objectItemName === "main character"
            );
            if (mainCharacterIndex !== -1) {
                // Remove the old main character
                updatedPlacements.splice(mainCharacterIndex, 1);
            }
        }
        return updatedPlacements;
    }

    /**
     * A function for validating the design of level info placements.
     *
     * Rule:
     * 1. main character must exist in the levelinfo.placement
     *
     * @param placements placements array filled with preview object's placement
     * @returns { isValid: is valid placements design or not; errMessage?: error Message if it is invalid design }
     */
    static placementsValidator(placements: PreviewObjectPlacement[]): { isValid: boolean; errMessage?: string } {
        // main character must exist in the levelinfo.placement
        const mainCharacterIndex = placements.findIndex(
            (p) => this.isPreviewObject(p) && p.previewObjectItem.objectItemName === "main character"
        );
        if (mainCharacterIndex === -1) {
            return { isValid: false, errMessage: "Main Character Preview Object not exist in the new level setting !" };
        }
        return { isValid: true };
    }
    /**
     * A convertor function for convert preview object to actual object
     *
     * @param placements placements array filled with preview object's placement
     * @returns actual object placemnt
     */
    static previewObjectConvertor(placements: PreviewObjectPlacement[]): Placement[] {
        const newPlacements = placements
            .filter((p) => this.isPreviewObject(p))
            .map((p) => ({
                id: `${p.previewObjectItem.type}-${p.previewObjectItem.objectItemName}-${p.coord.x}-${p.coord.y}`,
                coord: p.coord,
                type: p.previewObjectItem.type,
                itemName: p.previewObjectItem.objectItemName,
            }));
        return newPlacements;
    }
}

export default EditModeHelper;
