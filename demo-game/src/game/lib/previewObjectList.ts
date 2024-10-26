import { Facing } from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import { Avatar, PreviewObjectItem } from "../types/general";
import { CustomPlacementType, RoadType } from "../types/placement";
import RoadComponentFactory from "../components/placements/tile/road/RoadComponentFactory";
import React from "react";

export class PreviewObjectItemBuilder {
    private item: Partial<PreviewObjectItem>;
    private customProperties: Record<string, string>;

    constructor() {
        this.item = {};
        this.customProperties = {};
    }

    private setId() {
        const type = this.item.type;
        const objectItemName = this.item.objectItemName;
        const customPropertyString = Object.values(this.customProperties).join("-").replace(/\s+/g, "-"); // Replace spaces with dashes

        const id = `${type}-${objectItemName}` + (customPropertyString ? `-${customPropertyString}` : "");
        this.item.id = id;
    }

    setAvatar(avatar: Avatar): this {
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

const createSchoolPreviewObjectList = (schoolTypes: string[]): PreviewObjectItem[] => {
    const schoolTiles: PreviewObjectItem[] = [];
    schoolTypes.forEach((schoolType) => {
        const schoolTile = new PreviewObjectItemBuilder()
            .setType("Tile")
            .setObjectItemName("school")
            .setCustomProperty("schoolType", schoolType)
            .build();
        schoolTiles.push(schoolTile);
    });
    return schoolTiles;
};

const createRoadPreviewObjectList = (roadTypes: RoadType[]): PreviewObjectItem[] => {
    const roadTiles: PreviewObjectItem[] = [];

    roadTypes.forEach((roadType) => {
        let applicableFacings: Exclude<Facing, "none">[] = [];

        // Determine applicable facings for each roadType
        switch (roadType) {
            case "dead-end":
            case "turn":
            case "t-junction":
                applicableFacings = ["up", "left", "right", "down"];
                break;
            case "straight":
                applicableFacings = ["up", "left"];
                break;
            case "x-junction":
                applicableFacings = ["up"];
                break;
        }

        applicableFacings.forEach((f) => {
            const roadTile = new PreviewObjectItemBuilder()
                .setType("Tile")
                .setAvatar({
                    type: "ReactNode",
                    interface: {
                        componentId: "RoadComponentFactory",
                        props: {
                            roadType,
                            facing: f,
                        },
                    },
                })
                .setObjectItemName("road")
                .setCustomProperty("roadType", roadType)
                .setCustomProperty("facing", f)
                .build();

            roadTiles.push(roadTile);
        });
    });

    return roadTiles;
};

const avatarComponentMap: Record<string, React.ElementType> = {
    RoadComponentFactory: RoadComponentFactory,
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
            "project-next-js-game-engine",
        ]),
        // school
        ...createSchoolPreviewObjectList(["hku", "ckad", "aws-saa"]),
        // road
        ...createRoadPreviewObjectList(["dead-end", "straight", "t-junction", "turn", "x-junction"]),
    ],
};

export const handleDisplayAvatar = (item: PreviewObjectItem) => {
    if (typeof item.avatar === "undefined") {
        return item.id.split("-").slice(1).join(" ");
    }
    switch (item.avatar.type) {
        case "text":
            return item.id.split("-").slice(1).join(" ");
        case "ReactNode":
            const { componentId, props } = item.avatar.interface;
            const AvatarComponent = avatarComponentMap[componentId];
            return React.createElement(AvatarComponent, { ...props });
        default:
            const avatarType: never = item.avatar.type;
            throw new Error(`Unknown avatar type: ${item.avatar.type}`);
    }
};
