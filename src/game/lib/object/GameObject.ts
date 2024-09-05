import { LevelInfo, Placement, Position } from "@/game/types/general";

abstract class GameObject {
    position: Position;

    static retrieveObjectPlacmentInfo(
        levelInformation: LevelInfo,
        type: string,
        itemName: string,
        id?: string
    ): Placement {
        const placements = levelInformation.placements.filter(
            (placement) =>
                placement.type === type &&
                placement.itemName === itemName &&
                (typeof id !== "undefined" ? placement.id === id : true)
        );
        if (placements.length === 0) {
            throw new Error(`Error: Type [${type}] - ItemName [${itemName}] is not defined in the current level`);
        }
        if (placements.length > 1) {
            if (typeof id === "undefined") {
                throw new Error(
                    `Error: Type [${type}] - ItemName [${itemName}] have defined more than once in the current level. Place consider call the current method with placement ID.`
                );
            } else {
                throw new Error(
                    `Error: Type [${type}] - ItemName [${itemName}] - ID[${id}] have defined more than once in the current level. Place review the level design.`
                );
            }
        }
        return placements[0];
    }
    constructor(placement: Placement) {
        this.position = placement.position;
    }
}

export default GameObject;
