import { Facing } from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import { PreviewObjectItem } from "../types/general";
import { CustomPlacementType, RoadType } from "../types/placement";

class PreviewObjectItemBuilder {
    private item: Partial<PreviewObjectItem>;
    private customProperties: Record<string, string>;

    constructor() {
        this.item = {};
        this.customProperties = {};
    }

    private setId() {
        const objectItemName = this.item.objectItemName;
        const customPropertyString = Object.values(this.customProperties).join("-").replace(/\s+/g, "-"); // Replace spaces with dashes

        const id = `${objectItemName}-${customPropertyString}`;
        this.item.id = id;
    }

    setAvatar(avatar: any): this {
        this.item.avatar = avatar;
        return this;
    }

    setType(type: CustomPlacementType): this {
        this.item.type = type;
        return this;
    }

    setObjectItemName(objectItemName: string): this {
        this.item.objectItemName = objectItemName;
        return this;
    }

    setCustomProperty(key: string, value: string): this {
        this.customProperties[key] = value;
        return this;
    }

    private validateRequiredFields() {
        const requiredFields: (keyof PreviewObjectItem)[] = ["type", "objectItemName"];
        requiredFields.forEach((field) => {
            if (!this.item[field]) {
                throw new Error(`PreviewObjectItem: '${field}' is required.`);
            }
        });
    }

    build(): PreviewObjectItem {
        this.validateRequiredFields();
        this.item.customProperties = this.customProperties;
        this.setId();
        return this.item as PreviewObjectItem;
    }
}

const createSignagePreviewObjectList = (signageTypes: string[]): PreviewObjectItem[] => {
    const signageTiles: PreviewObjectItem[] = [];
    signageTypes.forEach((signageType) => {
        const signageTile = new PreviewObjectItemBuilder()
            .setType("Tile")
            .setObjectItemName("signage")
            .setCustomProperty("signageType", signageType)
            .build();
        signageTiles.push(signageTile);
    });
    return signageTiles;
};

const createSignage2PreviewObjectList = (signage2Types: string[]): PreviewObjectItem[] => {
    const signage2Tiles: PreviewObjectItem[] = [];
    signage2Types.forEach((signage2Type) => {
        const signage2Tile = new PreviewObjectItemBuilder()
            .setType("Tile")
            .setObjectItemName("signage2")
            .setCustomProperty("signageType", signage2Type)
            .build();
        signage2Tiles.push(signage2Tile);
    });
    return signage2Tiles;
};

const createCompanyPreviewObjectList = (companyTypes: string[]): PreviewObjectItem[] => {
    const companyTiles: PreviewObjectItem[] = [];
    companyTypes.forEach((companyType) => {
        const companyTile = new PreviewObjectItemBuilder()
            .setType("Tile")
            .setObjectItemName("company")
            .setCustomProperty("companyType", companyType)
            .build();
        companyTiles.push(companyTile);
    });
    return companyTiles;
};

const createPaintingPreviewObjectList = (paintingTypes: string[]): PreviewObjectItem[] => {
    const paintingTiles: PreviewObjectItem[] = [];
    paintingTypes.forEach((paintingType) => {
        const paintingTile = new PreviewObjectItemBuilder()
            .setType("Tile")
            .setObjectItemName("painting")
            .setCustomProperty("paintingType", paintingType)
            .build();
        paintingTiles.push(paintingTile);
    });
    return paintingTiles;
};

const createRoadPreviewObjectList = (roadTypes: RoadType[], facing: Exclude<Facing, "none">[]): PreviewObjectItem[] => {
    const roadTiles: PreviewObjectItem[] = [];

    roadTypes.forEach((roadType) => {
        facing.forEach((f) => {
            const roadTile = new PreviewObjectItemBuilder()
                .setType("Tile")
                .setObjectItemName("road")
                .setCustomProperty("roadType", roadType)
                .setCustomProperty("facing", f)
                .build();

            roadTiles.push(roadTile);
        });
    });

    return roadTiles;
};

export const previewObjectList: { [key in CustomPlacementType]: PreviewObjectItem[] } = {
    Character: [new PreviewObjectItemBuilder().setType("Character").setObjectItemName("main character").build()],
    Enemy: [],
    PickUp: [new PreviewObjectItemBuilder().setType("PickUp").setObjectItemName("resume").build()],
    Tile: [
        new PreviewObjectItemBuilder().setType("Tile").setObjectItemName("balloon").build(),
        new PreviewObjectItemBuilder().setType("Tile").setObjectItemName("flowers").build(),
        new PreviewObjectItemBuilder().setType("Tile").setObjectItemName("shrub").build(),
        // signage
        ...createSignagePreviewObjectList(["intro", "skill", "project", "education", "experience"]),
        // signage2
        ...createSignage2PreviewObjectList(["skill-languages", "skill-frontend", "skill-backend", "skill-others"]),
        new PreviewObjectItemBuilder().setType("Tile").setObjectItemName("finish line").build(),
        new PreviewObjectItemBuilder()
            .setType("Tile")
            .setObjectItemName("portal")
            .setCustomProperty("portalType", "prev")
            .build(),
        new PreviewObjectItemBuilder()
            .setType("Tile")
            .setObjectItemName("portal")
            .setCustomProperty("portalType", "next")
            .build(),
        // company
        ...createCompanyPreviewObjectList(["pl", "yau-lee", "redcliff"]),
        // painting
        ...createPaintingPreviewObjectList([
            "project-gamehub",
            "project-big-two",
            "project-character-gpt",
            "project-sudoku",
            "project-final-year-project",
            "project-arduino-car",
            "project-portfolio-game-v1",
        ]),
        // road
        ...createRoadPreviewObjectList(
            ["dead-end", "straight", "t-junction", "turn", "x-junction"],
            ["up", "left", "right", "down"]
        ),
    ],
};
