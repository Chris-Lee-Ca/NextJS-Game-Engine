import { Coordinate, Placement } from "game-engine/types/general";
import { CustomPlacement, PreviewObjectPlacement } from "../types/placement";
import { previewObjectList } from "../lib/previewObjectList";

class EditModeHelper {
    static isPreviewObject(placement: PreviewObjectPlacement): boolean {
        return placement.itemName === "preview object";
    }

    static isMainCharacter(placement: Placement): boolean {
        return placement.itemName === "main character" && placement.type === "Character";
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
     * A convertor function for convert custom placement to preview object placement
     *
     * @param customPlacement object's placement
     * @returns object's preview version placement
     */
    static placementToPreviewObjectPlacement(customPlacement: CustomPlacement): PreviewObjectPlacement {
        const placementIdToPreviewObjectId = (placement: CustomPlacement) => {
            const { id, coord, type, itemName, ...rest } = placement;
            const customPropertyString = Object.values(rest).join("-").replace(/\s+/g, "-"); // Replace spaces with dashes

            const previewObjectId = `${type}-${itemName}` + (customPropertyString ? `-${customPropertyString}` : "");
            return previewObjectId;
        };
        const targetedPreviewObject = previewObjectList[customPlacement.type].find(
            (previewObject) => previewObject.id === placementIdToPreviewObjectId(customPlacement)
        );
        if (typeof targetedPreviewObject === "undefined") {
            throw Error(`Error: Placement -- ${customPlacement.id} does not exist in the preview object list`);
        }
        return {
            id: `Tile-preview-object-${customPlacement.coord.x}-${customPlacement.coord.y}`,
            coord: customPlacement.coord,
            type: "Tile",
            itemName: "preview object",
            previewObjectItem: targetedPreviewObject,
        };
    }

    /**
     * A convertor function for convert preview object to actual object
     *
     * @param placements preview object's placement
     * @returns actual object placemnt
     */
    static previewObjectToPlacement(previewObjectPlacement: PreviewObjectPlacement): Placement {
        const { objectItemName, type, customProperties } = previewObjectPlacement.previewObjectItem;
        return {
            id: `${type}-${objectItemName}-${previewObjectPlacement.coord.x}-${previewObjectPlacement.coord.y}`,
            coord: previewObjectPlacement.coord,
            type,
            itemName: objectItemName,
            ...customProperties,
        };
    }

    /**
     * A convertor function for convert preview object placement list to actual object placement list
     *
     * @param previewObjectPlacement placements array filled with preview object's placement
     * @returns placements array filled with actual object placemnt
     */
    static previewObjectPlacementListToPlacementList(placements: PreviewObjectPlacement[]): Placement[] {
        // Separate main character and others
        const others = placements.filter((p) => !this.isMainCharacter(p));
        // Convert
        const othersPlacements = others.map((p) => this.previewObjectToPlacement(p));

        // Return combined array with main character at the end
        return othersPlacements;
    }

    /**
     * A convertor function for convert actual object placement list to preview object placement list
     *
     * @param placements placements array filled with actual object placemnt
     * @returns placements array filled with preview object's placement and main character
     */
    static placementListToPreviewObjectPlacementList(
        placements: CustomPlacement[]
    ): (Placement | PreviewObjectPlacement)[] {
        // Separate main character and others
        const mainCharacter = placements.filter(this.isMainCharacter)[0];
        const others = placements.filter((p) => !this.isMainCharacter(p));
        // Convert
        const mainCharacterPreviewPlacement = this.placementToPreviewObjectPlacement(mainCharacter);
        const othersPlacements = others.map((p) => this.placementToPreviewObjectPlacement(p));

        // Return combined array with main character at the end
        return [...othersPlacements, mainCharacterPreviewPlacement, mainCharacter];
    }
}

export default EditModeHelper;
