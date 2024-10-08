import { CustomPlacementType, PreviewObjectItem } from "../types/general";

export const previewObjectList: { [key in CustomPlacementType]: PreviewObjectItem[] } = {
    Character: [
        {
            id: "main character",
            type: "Character",
            objectItemName: "main character",
            avatar: "",
        },
    ],
    Enemy: [],
    PickUp: [
        {
            id: "resume",
            type: "PickUp",
            objectItemName: "resume",
            avatar: "",
        },
    ],
    Tile: [
        {
            id: "balloon",
            type: "Tile",
            objectItemName: "balloon",
            avatar: "",
        },
        {
            id: "flowers",
            type: "Tile",
            objectItemName: "flowers",
            avatar: "",
        },
        {
            id: "shrub",
            type: "Tile",
            objectItemName: "shrub",
            avatar: "",
        },
        {
            id: "signage-intro",
            type: "Tile",
            objectItemName: "signage",
            avatar: "",
            signageType: "intro",
        },
        {
            id: "signage-skill",
            type: "Tile",
            objectItemName: "signage",
            avatar: "",
            signageType: "skill",
        },
        {
            id: "signage-project",
            type: "Tile",
            objectItemName: "signage",
            avatar: "",
            signageType: "project",
        },
        {
            id: "signage-education",
            type: "Tile",
            objectItemName: "signage",
            avatar: "",
            signageType: "education",
        },
        {
            id: "signage-experience",
            type: "Tile",
            objectItemName: "signage",
            avatar: "",
            signageType: "experience",
        },
        {
            id: "signage2-skill-languages",
            type: "Tile",
            objectItemName: "signage2",
            avatar: "",
            signageType: "skill-languages",
        },
        {
            id: "signage2-skill-frontend",
            type: "Tile",
            objectItemName: "signage2",
            avatar: "",
            signageType: "skill-frontend",
        },
        {
            id: "signage2-skill-backend",
            type: "Tile",
            objectItemName: "signage2",
            avatar: "",
            signageType: "skill-backend",
        },
        {
            id: "signage2-skill-others",
            type: "Tile",
            objectItemName: "signage2",
            avatar: "",
            signageType: "skill-others",
        },
    ],
};
