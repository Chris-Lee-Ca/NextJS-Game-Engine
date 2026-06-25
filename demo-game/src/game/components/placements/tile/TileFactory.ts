import { GameObjectFactory } from "game-engine/components/GameObjectFactory";
import Shrub from "./shrub";
import { CreateCustomObjectParams } from "@/game/types/general";
import GameObject from "game-engine/components/GameObject";
import PreviewObject from "./previewObject";
import Flowers from "./flowers";
import Signage from "./signage";
import Signage2 from "./signage2";
import Balloon from "./balloon";
import FinishLine from "./finishLine";
import Portal from "./portal";
import Company from "./company";
import Painting from "./painting";
import Road from "./road";
import School from "./school";

type TileCreator = (params: CreateCustomObjectParams) => GameObject;

const tileCreators: Record<string, TileCreator> = {
    flowers: (params) => new Flowers(params.placement),
    shrub: (params) => new Shrub(params.placement),
    "preview object": (params) => new PreviewObject(params.placement),
    signage: (params) => new Signage(params.placement),
    signage2: (params) => new Signage2(params.placement),
    balloon: (params) => new Balloon(params.placement),
    "finish line": (params) => new FinishLine(params),
    portal: (params) => new Portal(params),
    company: (params) => new Company(params.placement),
    painting: (params) => new Painting(params.placement),
    road: (params) => new Road(params.placement),
    school: (params) => new School(params.placement),
};

// Lets callers register a new tile itemName -> creator without editing this file.
export const registerTileCreator = (itemName: string, creator: TileCreator): void => {
    tileCreators[itemName] = creator;
};

class TileFactory extends GameObjectFactory {
    public createObject(params: CreateCustomObjectParams): GameObject {
        const creator = tileCreators[params.placement.itemName];
        if (!creator) {
            throw new Error(`Unknown placement itemName: ${params.placement.itemName}`);
        }
        return creator(params);
    }
}

export default TileFactory;
