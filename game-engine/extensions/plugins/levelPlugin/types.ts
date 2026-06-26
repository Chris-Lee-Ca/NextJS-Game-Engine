import { ComponentType } from "react";
import { Offset, Placement, SpriteSheetInfo } from "../../../types/general";

type Theme = {
    backgroundSpriteSheetInfo: SpriteSheetInfo;
    imageOffset: Offset;
    cliffSpriteSheetInfo: SpriteSheetInfo;
    cliffImageOffset: Offset;
};

type LevelInfo = {
    levelTitle: string;
    theme: Theme;
    tilesWidth: number;
    tilesHeight: number;
    placements: Placement[];
    nextLevel?: string;
    prevLevel?: string;
};

type AllLevelInfo = { [key: string]: LevelInfo };

// A renderable a game passes into LevelHandler to visualize level transitions.
type LevelTransitionComponent = ComponentType<{ isTransitioning: boolean }>;

export type { Theme, LevelInfo, AllLevelInfo, LevelTransitionComponent };
