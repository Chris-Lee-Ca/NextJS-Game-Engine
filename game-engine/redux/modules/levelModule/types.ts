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
};

type AllLevelInfo = { [key: string]: LevelInfo };

export type { Theme, LevelInfo, AllLevelInfo };
