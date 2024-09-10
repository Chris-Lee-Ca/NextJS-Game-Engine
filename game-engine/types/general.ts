type KeyboardEventType = "keydown" | "keyup";

type Direction = {
    x: number;
    y: number;
};

type Position = {
    x: number;
    y: number;
};

type Offset = {
    x: number;
    y: number;
};

type Animations = {
    [key: string]: [number, number][];
};

type Placement = {
    id: string;
    position: Position;
    type: string;
    itemName: string;
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

export type { KeyboardEventType, Direction, Position, Offset, Animations, Placement, SpriteSheetInfo };
