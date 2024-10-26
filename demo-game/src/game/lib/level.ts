import { LevelInfo, AllLevelInfo } from "game-engine/extensions/plugins/levelPlugin";
import { MAIN_SPRITE_SHEET } from "./conts";
import { Placement } from "game-engine/types/general";

const defaultLevelTheme = {
    backgroundSpriteSheetInfo: MAIN_SPRITE_SHEET,
    imageOffset: {
        x: MAIN_SPRITE_SHEET.GREEN_ISLAND_SECTION.X_OFFSET,
        y: MAIN_SPRITE_SHEET.GREEN_ISLAND_SECTION.Y_OFFSET,
    },
    cliffSpriteSheetInfo: MAIN_SPRITE_SHEET,
    cliffImageOffset: {
        x: MAIN_SPRITE_SHEET.GREEN_ISLAND_CLIFF_SECTION.X_OFFSET,
        y: MAIN_SPRITE_SHEET.GREEN_ISLAND_CLIFF_SECTION.Y_OFFSET,
    },
};

const intro_level_1: LevelInfo = {
    levelTitle: "intro-level-1",
    nextLevel: "resume-level-2",
    theme: defaultLevelTheme,
    tilesWidth: 9,
    tilesHeight: 5,
    placements: [
        {
            id: "Tile-shrub-5-4",
            coord: {
                x: 5,
                y: 4,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-flowers-7-0",
            coord: {
                x: 7,
                y: 0,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-5-1",
            coord: {
                x: 5,
                y: 1,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-3-0",
            coord: {
                x: 3,
                y: 0,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-1-1",
            coord: {
                x: 1,
                y: 1,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-signage-4-2",
            coord: {
                x: 4,
                y: 2,
            },
            type: "Tile",
            itemName: "signage",
            signageType: "intro",
        },
        {
            id: "Tile-portal-8-2",
            coord: {
                x: 8,
                y: 2,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-shrub-7-3",
            coord: {
                x: 7,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-2-3",
            coord: {
                x: 2,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-0-4",
            coord: {
                x: 0,
                y: 4,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Character-main character-0-2",
            coord: {
                x: 0,
                y: 2,
            },
            type: "Character",
            itemName: "main character",
        },
    ] as Placement[],
};

const resume_level_2: LevelInfo = {
    levelTitle: "resume-level-2",
    prevLevel: "intro-level-1",
    nextLevel: "skills-level-3",
    theme: defaultLevelTheme,
    tilesWidth: 9,
    tilesHeight: 5,
    placements: [
        {
            id: "PickUp-resume-2-0",
            coord: {
                x: 2,
                y: 0,
            },
            type: "PickUp",
            itemName: "resume",
        },
        {
            id: "Tile-shrub-3-2",
            coord: {
                x: 3,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-2-2",
            coord: {
                x: 2,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-1-3",
            coord: {
                x: 1,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-1-2",
            coord: {
                x: 1,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-1-1",
            coord: {
                x: 1,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-1-0",
            coord: {
                x: 1,
                y: 0,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-portal-0-0",
            coord: {
                x: 0,
                y: 0,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "prev",
        },
        {
            id: "Tile-portal-8-4",
            coord: {
                x: 8,
                y: 4,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-shrub-8-3",
            coord: {
                x: 8,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-8-2",
            coord: {
                x: 8,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-8-1",
            coord: {
                x: 8,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-8-0",
            coord: {
                x: 8,
                y: 0,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-7-0",
            coord: {
                x: 7,
                y: 0,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-0",
            coord: {
                x: 6,
                y: 0,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-5-0",
            coord: {
                x: 5,
                y: 0,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-4-0",
            coord: {
                x: 4,
                y: 0,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-5-2",
            coord: {
                x: 5,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-2",
            coord: {
                x: 6,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-3",
            coord: {
                x: 6,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-4",
            coord: {
                x: 6,
                y: 4,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-5-4",
            coord: {
                x: 5,
                y: 4,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-4-4",
            coord: {
                x: 4,
                y: 4,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-3-4",
            coord: {
                x: 3,
                y: 4,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Character-main character-0-1",
            coord: {
                x: 0,
                y: 1,
            },
            type: "Character",
            itemName: "main character",
        },
    ] as Placement[],
};

const skills_level_3: LevelInfo = {
    levelTitle: "skills-level-3",
    prevLevel: "resume-level-2",
    nextLevel: "education-level-4",
    theme: defaultLevelTheme,
    tilesWidth: 9,
    tilesHeight: 5,
    placements: [
        {
            id: "Tile-signage2-6-1",
            coord: {
                x: 6,
                y: 1,
            },
            type: "Tile",
            itemName: "signage2",
            signageType: "skill-backend",
        },
        {
            id: "Tile-signage2-2-3",
            coord: {
                x: 2,
                y: 3,
            },
            type: "Tile",
            itemName: "signage2",
            signageType: "skill-frontend",
        },
        {
            id: "Tile-signage2-2-1",
            coord: {
                x: 2,
                y: 1,
            },
            type: "Tile",
            itemName: "signage2",
            signageType: "skill-languages",
        },
        {
            id: "Tile-signage2-6-3",
            coord: {
                x: 6,
                y: 3,
            },
            type: "Tile",
            itemName: "signage2",
            signageType: "skill-others",
        },
        {
            id: "Tile-portal-0-0",
            coord: {
                x: 0,
                y: 0,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-portal-0-4",
            coord: {
                x: 0,
                y: 4,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-portal-8-4",
            coord: {
                x: 8,
                y: 4,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-portal-8-0",
            coord: {
                x: 8,
                y: 0,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-portal-4-3",
            coord: {
                x: 4,
                y: 3,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "prev",
        },
        {
            id: "Tile-signage-4-1",
            coord: {
                x: 4,
                y: 1,
            },
            type: "Tile",
            itemName: "signage",
            signageType: "skill",
        },
        {
            id: "Character-main character-4-2",
            coord: {
                x: 4,
                y: 2,
            },
            type: "Character",
            itemName: "main character",
        },
    ] as Placement[],
};

const eduction_level_4: LevelInfo = {
    levelTitle: "education-level-4",
    prevLevel: "skills-level-3",
    nextLevel: "experience-level-5",
    theme: defaultLevelTheme,
    tilesWidth: 13,
    tilesHeight: 5,
    placements: [
        {
            id: "Tile-road-8-2",
            coord: {
                x: 8,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "down",
        },
        {
            id: "Tile-road-10-2",
            coord: {
                x: 10,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "up",
        },
        {
            id: "Tile-road-6-2",
            coord: {
                x: 6,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "up",
        },
        {
            id: "Tile-road-4-2",
            coord: {
                x: 4,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "right",
        },
        {
            id: "Tile-road-2-2",
            coord: {
                x: 2,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "left",
        },
        {
            id: "Tile-road-5-2",
            coord: {
                x: 5,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-7-2",
            coord: {
                x: 7,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-9-2",
            coord: {
                x: 9,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-11-2",
            coord: {
                x: 11,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "dead-end",
            facing: "left",
        },
        {
            id: "Tile-portal-12-2",
            coord: {
                x: 12,
                y: 2,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-school-10-1",
            coord: {
                x: 10,
                y: 1,
            },
            type: "Tile",
            itemName: "school",
            schoolType: "aws-saa",
        },
        {
            id: "Tile-school-8-3",
            coord: {
                x: 8,
                y: 3,
            },
            type: "Tile",
            itemName: "school",
            schoolType: "ckad",
        },
        {
            id: "Tile-school-6-1",
            coord: {
                x: 6,
                y: 1,
            },
            type: "Tile",
            itemName: "school",
            schoolType: "hku",
        },
        {
            id: "Tile-signage-3-2",
            coord: {
                x: 3,
                y: 2,
            },
            type: "Tile",
            itemName: "signage",
            signageType: "education",
        },
        {
            id: "Tile-road-2-1",
            coord: {
                x: 2,
                y: 1,
            },
            type: "Tile",
            itemName: "road",
            roadType: "turn",
            facing: "down",
        },
        {
            id: "Tile-road-3-3",
            coord: {
                x: 3,
                y: 3,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-3-1",
            coord: {
                x: 3,
                y: 1,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-4-1",
            coord: {
                x: 4,
                y: 1,
            },
            type: "Tile",
            itemName: "road",
            roadType: "turn",
            facing: "left",
        },
        {
            id: "Tile-road-4-3",
            coord: {
                x: 4,
                y: 3,
            },
            type: "Tile",
            itemName: "road",
            roadType: "turn",
            facing: "up",
        },
        {
            id: "Tile-road-2-3",
            coord: {
                x: 2,
                y: 3,
            },
            type: "Tile",
            itemName: "road",
            roadType: "turn",
            facing: "right",
        },
        {
            id: "Tile-road-1-2",
            coord: {
                x: 1,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "dead-end",
            facing: "right",
        },
        {
            id: "Tile-portal-0-0",
            coord: {
                x: 0,
                y: 0,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "prev",
        },
        {
            id: "Character-main character-0-1",
            coord: {
                x: 0,
                y: 1,
            },
            type: "Character",
            itemName: "main character",
        },
    ] as Placement[],
};

const experience_level_5: LevelInfo = {
    levelTitle: "experience-level-5",
    prevLevel: "education-level-4",
    nextLevel: "project-level-6",
    theme: defaultLevelTheme,
    tilesWidth: 20,
    tilesHeight: 5,
    placements: [
        {
            id: "Tile-portal-19-2",
            coord: {
                x: 19,
                y: 2,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-road-18-2",
            coord: {
                x: 18,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "dead-end",
            facing: "left",
        },
        {
            id: "Tile-road-17-2",
            coord: {
                x: 17,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-company-16-1",
            coord: {
                x: 16,
                y: 1,
            },
            type: "Tile",
            itemName: "company",
            companyType: "redcliff",
        },
        {
            id: "Tile-company-14-3",
            coord: {
                x: 14,
                y: 3,
            },
            type: "Tile",
            itemName: "company",
            companyType: "yau-lee",
        },
        {
            id: "Tile-company-12-1",
            coord: {
                x: 12,
                y: 1,
            },
            type: "Tile",
            itemName: "company",
            companyType: "pl",
        },
        {
            id: "Tile-road-16-2",
            coord: {
                x: 16,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "up",
        },
        {
            id: "Tile-road-15-2",
            coord: {
                x: 15,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-14-2",
            coord: {
                x: 14,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "down",
        },
        {
            id: "Tile-road-13-2",
            coord: {
                x: 13,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-12-2",
            coord: {
                x: 12,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "up",
        },
        {
            id: "Tile-road-11-2",
            coord: {
                x: 11,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-flowers-10-4",
            coord: {
                x: 10,
                y: 4,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-10-3",
            coord: {
                x: 10,
                y: 3,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-9-4",
            coord: {
                x: 9,
                y: 4,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-9-3",
            coord: {
                x: 9,
                y: 3,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-10-1",
            coord: {
                x: 10,
                y: 1,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-10-0",
            coord: {
                x: 10,
                y: 0,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-9-1",
            coord: {
                x: 9,
                y: 1,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-9-0",
            coord: {
                x: 9,
                y: 0,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-road-10-2",
            coord: {
                x: 10,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-9-2",
            coord: {
                x: 9,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-8-2",
            coord: {
                x: 8,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-7-2",
            coord: {
                x: 7,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-6-2",
            coord: {
                x: 6,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-flowers-8-4",
            coord: {
                x: 8,
                y: 4,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-7-4",
            coord: {
                x: 7,
                y: 4,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-8-3",
            coord: {
                x: 8,
                y: 3,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-7-3",
            coord: {
                x: 7,
                y: 3,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-8-1",
            coord: {
                x: 8,
                y: 1,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-7-1",
            coord: {
                x: 7,
                y: 1,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-8-0",
            coord: {
                x: 8,
                y: 0,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-flowers-7-0",
            coord: {
                x: 7,
                y: 0,
            },
            type: "Tile",
            itemName: "flowers",
        },
        {
            id: "Tile-shrub-6-4",
            coord: {
                x: 6,
                y: 4,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-3",
            coord: {
                x: 6,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-1",
            coord: {
                x: 6,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-0",
            coord: {
                x: 6,
                y: 0,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-signage-4-2",
            coord: {
                x: 4,
                y: 2,
            },
            type: "Tile",
            itemName: "signage",
            signageType: "experience",
        },
        {
            id: "Tile-road-5-1",
            coord: {
                x: 5,
                y: 1,
            },
            type: "Tile",
            itemName: "road",
            roadType: "turn",
            facing: "left",
        },
        {
            id: "Tile-road-3-1",
            coord: {
                x: 3,
                y: 1,
            },
            type: "Tile",
            itemName: "road",
            roadType: "turn",
            facing: "down",
        },
        {
            id: "Tile-road-3-3",
            coord: {
                x: 3,
                y: 3,
            },
            type: "Tile",
            itemName: "road",
            roadType: "turn",
            facing: "right",
        },
        {
            id: "Tile-road-5-3",
            coord: {
                x: 5,
                y: 3,
            },
            type: "Tile",
            itemName: "road",
            roadType: "turn",
            facing: "up",
        },
        {
            id: "Tile-road-5-2",
            coord: {
                x: 5,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "right",
        },
        {
            id: "Tile-road-4-3",
            coord: {
                x: 4,
                y: 3,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-4-1",
            coord: {
                x: 4,
                y: 1,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-3-2",
            coord: {
                x: 3,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "left",
        },
        {
            id: "Tile-road-2-2",
            coord: {
                x: 2,
                y: 2,
            },
            type: "Tile",
            itemName: "road",
            roadType: "dead-end",
            facing: "right",
        },
        {
            id: "Tile-portal-0-2",
            coord: {
                x: 0,
                y: 2,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "prev",
        },
        {
            id: "Character-main character-1-2",
            coord: {
                x: 1,
                y: 2,
            },
            type: "Character",
            itemName: "main character",
        },
    ] as Placement[],
};

const project_level_6: LevelInfo = {
    levelTitle: "project-level-6",
    prevLevel: "experience-level-5",
    nextLevel: "finish-level-7",
    theme: defaultLevelTheme,
    tilesWidth: 5,
    tilesHeight: 15,
    placements: [
        {
            id: "Tile-painting-4-12",
            coord: {
                x: 4,
                y: 12,
            },
            type: "Tile",
            itemName: "painting",
            paintingType: "project-next-js-game-engine",
        },
        {
            id: "Tile-road-3-12",
            coord: {
                x: 3,
                y: 12,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-2-12",
            coord: {
                x: 2,
                y: 12,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "right",
        },
        {
            id: "Tile-portal-2-14",
            coord: {
                x: 2,
                y: 14,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "next",
        },
        {
            id: "Tile-road-2-13",
            coord: {
                x: 2,
                y: 13,
            },
            type: "Tile",
            itemName: "road",
            roadType: "dead-end",
            facing: "up",
        },
        {
            id: "Tile-road-2-4",
            coord: {
                x: 2,
                y: 4,
            },
            type: "Tile",
            itemName: "road",
            roadType: "dead-end",
            facing: "down",
        },
        {
            id: "Tile-road-1-11",
            coord: {
                x: 1,
                y: 11,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-2-11",
            coord: {
                x: 2,
                y: 11,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "left",
        },
        {
            id: "Tile-painting-0-11",
            coord: {
                x: 0,
                y: 11,
            },
            type: "Tile",
            itemName: "painting",
            paintingType: "project-portfolio-game-v1",
        },
        {
            id: "Tile-painting-4-10",
            coord: {
                x: 4,
                y: 10,
            },
            type: "Tile",
            itemName: "painting",
            paintingType: "project-arduino-car",
        },
        {
            id: "Tile-road-3-10",
            coord: {
                x: 3,
                y: 10,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-2-10",
            coord: {
                x: 2,
                y: 10,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "right",
        },
        {
            id: "Tile-painting-0-9",
            coord: {
                x: 0,
                y: 9,
            },
            type: "Tile",
            itemName: "painting",
            paintingType: "project-final-year-project",
        },
        {
            id: "Tile-painting-4-8",
            coord: {
                x: 4,
                y: 8,
            },
            type: "Tile",
            itemName: "painting",
            paintingType: "project-sudoku",
        },
        {
            id: "Tile-painting-0-7",
            coord: {
                x: 0,
                y: 7,
            },
            type: "Tile",
            itemName: "painting",
            paintingType: "project-character-gpt",
        },
        {
            id: "Tile-road-1-9",
            coord: {
                x: 1,
                y: 9,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-3-8",
            coord: {
                x: 3,
                y: 8,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-1-7",
            coord: {
                x: 1,
                y: 7,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-2-9",
            coord: {
                x: 2,
                y: 9,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "left",
        },
        {
            id: "Tile-road-2-8",
            coord: {
                x: 2,
                y: 8,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "right",
        },
        {
            id: "Tile-road-2-7",
            coord: {
                x: 2,
                y: 7,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "left",
        },
        {
            id: "Tile-painting-4-6",
            coord: {
                x: 4,
                y: 6,
            },
            type: "Tile",
            itemName: "painting",
            paintingType: "project-big-two",
        },
        {
            id: "Tile-road-3-6",
            coord: {
                x: 3,
                y: 6,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-2-6",
            coord: {
                x: 2,
                y: 6,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "right",
        },
        {
            id: "Tile-painting-0-5",
            coord: {
                x: 0,
                y: 5,
            },
            type: "Tile",
            itemName: "painting",
            paintingType: "project-gamehub",
        },
        {
            id: "Tile-road-1-5",
            coord: {
                x: 1,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-2-5",
            coord: {
                x: 2,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "t-junction",
            facing: "left",
        },
        {
            id: "Tile-signage-2-3",
            coord: {
                x: 2,
                y: 3,
            },
            type: "Tile",
            itemName: "signage",
            signageType: "project",
        },
        {
            id: "Tile-portal-2-0",
            coord: {
                x: 2,
                y: 0,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "prev",
        },
        {
            id: "Character-main character-2-1",
            coord: {
                x: 2,
                y: 1,
            },
            type: "Character",
            itemName: "main character",
        },
    ] as Placement[],
};

const finish_level_7: LevelInfo = {
    levelTitle: "finish-level-7",
    prevLevel: "project-level-6",
    theme: defaultLevelTheme,
    tilesWidth: 24,
    tilesHeight: 11,
    placements: [
        {
            id: "Tile-road-2-5",
            coord: {
                x: 2,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "dead-end",
            facing: "right",
        },
        {
            id: "Tile-balloon-23-7",
            coord: {
                x: 23,
                y: 7,
            },
            type: "Tile",
            itemName: "balloon",
        },
        {
            id: "Tile-balloon-23-4",
            coord: {
                x: 23,
                y: 4,
            },
            type: "Tile",
            itemName: "balloon",
        },
        {
            id: "Tile-balloon-22-6",
            coord: {
                x: 22,
                y: 6,
            },
            type: "Tile",
            itemName: "balloon",
        },
        {
            id: "Tile-balloon-21-7",
            coord: {
                x: 21,
                y: 7,
            },
            type: "Tile",
            itemName: "balloon",
        },
        {
            id: "Tile-balloon-22-3",
            coord: {
                x: 22,
                y: 3,
            },
            type: "Tile",
            itemName: "balloon",
        },
        {
            id: "Tile-balloon-21-4",
            coord: {
                x: 21,
                y: 4,
            },
            type: "Tile",
            itemName: "balloon",
        },
        {
            id: "Tile-finish line-22-5",
            coord: {
                x: 22,
                y: 5,
            },
            type: "Tile",
            itemName: "finish line",
        },
        {
            id: "Tile-road-21-5",
            coord: {
                x: 21,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "dead-end",
            facing: "left",
        },
        {
            id: "Tile-road-20-5",
            coord: {
                x: 20,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-19-5",
            coord: {
                x: 19,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-portal-0-5",
            coord: {
                x: 0,
                y: 5,
            },
            type: "Tile",
            itemName: "portal",
            portalType: "prev",
        },
        {
            id: "Tile-road-18-5",
            coord: {
                x: 18,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-17-5",
            coord: {
                x: 17,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-16-5",
            coord: {
                x: 16,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-15-5",
            coord: {
                x: 15,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-14-5",
            coord: {
                x: 14,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-13-5",
            coord: {
                x: 13,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-12-5",
            coord: {
                x: 12,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-10-5",
            coord: {
                x: 10,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-11-5",
            coord: {
                x: 11,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-9-5",
            coord: {
                x: 9,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-8-5",
            coord: {
                x: 8,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-7-5",
            coord: {
                x: 7,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-6-5",
            coord: {
                x: 6,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-5-5",
            coord: {
                x: 5,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-4-5",
            coord: {
                x: 4,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-road-3-5",
            coord: {
                x: 3,
                y: 5,
            },
            type: "Tile",
            itemName: "road",
            roadType: "straight",
            facing: "left",
        },
        {
            id: "Tile-shrub-15-9",
            coord: {
                x: 15,
                y: 9,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-13-9",
            coord: {
                x: 13,
                y: 9,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-15-7",
            coord: {
                x: 15,
                y: 7,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-15-8",
            coord: {
                x: 15,
                y: 8,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-14-9",
            coord: {
                x: 14,
                y: 9,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-13-8",
            coord: {
                x: 13,
                y: 8,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-13-7",
            coord: {
                x: 13,
                y: 7,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-9-8",
            coord: {
                x: 9,
                y: 8,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-9-9",
            coord: {
                x: 9,
                y: 9,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-10-9",
            coord: {
                x: 10,
                y: 9,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-11-9",
            coord: {
                x: 11,
                y: 9,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-11-8",
            coord: {
                x: 11,
                y: 8,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-11-7",
            coord: {
                x: 11,
                y: 7,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-10-7",
            coord: {
                x: 10,
                y: 7,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-9-7",
            coord: {
                x: 9,
                y: 7,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-9",
            coord: {
                x: 6,
                y: 9,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-8",
            coord: {
                x: 6,
                y: 8,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-7-7",
            coord: {
                x: 7,
                y: 7,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-5-7",
            coord: {
                x: 5,
                y: 7,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-19-3",
            coord: {
                x: 19,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-19-1",
            coord: {
                x: 19,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-18-2",
            coord: {
                x: 18,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-17-3",
            coord: {
                x: 17,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-17-2",
            coord: {
                x: 17,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-17-1",
            coord: {
                x: 17,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-15-1",
            coord: {
                x: 15,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-15-2",
            coord: {
                x: 15,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-15-3",
            coord: {
                x: 15,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-14-2",
            coord: {
                x: 14,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-13-3",
            coord: {
                x: 13,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-13-2",
            coord: {
                x: 13,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-13-1",
            coord: {
                x: 13,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-11-3",
            coord: {
                x: 11,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-11-2",
            coord: {
                x: 11,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-9-3",
            coord: {
                x: 9,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-9-2",
            coord: {
                x: 9,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-10-1",
            coord: {
                x: 10,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-7-3",
            coord: {
                x: 7,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-7-2",
            coord: {
                x: 7,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-7-1",
            coord: {
                x: 7,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-6-2",
            coord: {
                x: 6,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-5-3",
            coord: {
                x: 5,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-5-2",
            coord: {
                x: 5,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-5-1",
            coord: {
                x: 5,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-2-3",
            coord: {
                x: 2,
                y: 3,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-2-2",
            coord: {
                x: 2,
                y: 2,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-3-1",
            coord: {
                x: 3,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-2-1",
            coord: {
                x: 2,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Tile-shrub-1-1",
            coord: {
                x: 1,
                y: 1,
            },
            type: "Tile",
            itemName: "shrub",
        },
        {
            id: "Character-main character-1-5",
            coord: {
                x: 1,
                y: 5,
            },
            type: "Character",
            itemName: "main character",
        },
    ] as Placement[],
};

export const allDemoLevelInfo: AllLevelInfo = {
    "intro-level-1": intro_level_1,
    "resume-level-2": resume_level_2,
    "skills-level-3": skills_level_3,
    "education-level-4": eduction_level_4,
    "experience-level-5": experience_level_5,
    "project-level-6": project_level_6,
    "finish-level-7": finish_level_7,
};
