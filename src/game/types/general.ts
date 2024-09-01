type KeyboardEventType = "keydown" | "keyup";

type Direction = {
    x: number;
    y: number;
};

type Offset = {
    x: number;
    y: number;
};

type GameObject = {
    id: number;
    position: { x: number; y: number };
    update(deltaTime: number): void; // Pass deltaTime for smoother updates
};

type Animations = {
    [key: string]: [number, number][];
};
type Theme = {
    backgroundSpriteSheetInfo: SpriteSheetInfo;
    imageOffset: Offset;
    cliffSpriteSheetInfo: SpriteSheetInfo;
    cliffImageOffset: Offset;
};

type Placement = {
    x: number;
    y: number;
    hasBeenCollected?: boolean;
    type: "Character" | "Tile" | "PickUp" | "Enemy";
    itemName: string;
};

interface Tile extends Placement {}
interface Pickup extends Placement {}
interface Enemy extends Placement {}

type Level = {
    theme: Theme;
    tilesWidth: number;
    tilesHeight: number;
    placements: Placement[];
};

type SpriteSheetInfo = {
    ID: string;
    SRC: string;
    WIDTH: number;
    HEIGHT: number;
    BORDER: number;
    SPACING: number;
    ADJUST_SCALE_FACTOR: number;
    [key: string]: any;
};

export type { KeyboardEventType, Direction, Offset, GameObject, Animations, Placement, Level, SpriteSheetInfo };
