import { Coordinate, Placement } from "game-engine/types/general";
import { EditModeLevelInfo } from "../types/general";
import { defaultLevelTheme } from "../lib/level";
import { PreviewObjectPlacement } from "../types/placement";
import { PreviewObjectItemBuilder } from "../lib/previewObjectList";

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
    static editModeLevelInfoInitializr(): EditModeLevelInfo {
        const defaultMainCharacterCoord: Coordinate = { x: 0, y: 0 };
        return {
            levelTitle: "default-game-level-title",
            theme: defaultLevelTheme,
            tilesWidth: 3,
            tilesHeight: 3,
            placements: [
                {
                    id: `Tile-preview-object-${defaultMainCharacterCoord.x}-${defaultMainCharacterCoord.y}`,
                    coord: defaultMainCharacterCoord,
                    type: "Tile",
                    itemName: "preview object",
                    previewObjectItem: new PreviewObjectItemBuilder()
                        .setType("Character")
                        .setObjectItemName("main character")
                        .build(),
                },
                {
                    id: `Character-main-character-${defaultMainCharacterCoord.x}-${defaultMainCharacterCoord.y}`,
                    coord: defaultMainCharacterCoord,
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
     * A function for removing a preview object placement to an existing placements array.
     *
     * Rule:
     * 1. If the target remove item is main character, ignore it.
     *
     * @param oldPlacements - The array of placements containing the current preview object placements.
     * @param coord - The coord of preview object placement to be removed.
     * @returns The updated placements array without the removed preview object placement.
     */
    static placementsRemover(oldPlacements: PreviewObjectPlacement[], coord: Coordinate): PreviewObjectPlacement[] {
        // Find the index of the target placement
        const targetIndex = oldPlacements.findIndex(
            (placement) =>
                this.isPreviewObject(placement) &&
                JSON.stringify(placement.coord) === JSON.stringify(coord) &&
                placement.previewObjectItem.objectItemName !== "main character"
        );

        if (targetIndex === -1) {
            return oldPlacements;
        }

        const updatedPlacements = [...oldPlacements];
        updatedPlacements.splice(targetIndex, 1); // Remove the target placement
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
    static previewObjectToPlacement(placements: PreviewObjectPlacement[]): Placement[] {
        const newPlacements = placements
            .filter((p) => this.isPreviewObject(p))
            .map((p) => {
                const { id, avatar, objectItemName, type, customProperties } = p.previewObjectItem;
                return {
                    id: `${type}-${objectItemName}-${p.coord.x}-${p.coord.y}`,
                    coord: p.coord,
                    type,
                    itemName: objectItemName,
                    ...customProperties,
                };
            });
        return newPlacements;
    }
}

export default EditModeHelper;
