type KeyboardEventType = "keydown" | "keyup";

type Direction = {
    x: number;
    y: number;
};

type Coordinate = {
    x: number;
    y: number;
};
type Pixel = number;

type Vector2 = {
    x: Pixel;
    y: Pixel;
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
    position: Coordinate;
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

export type {
    KeyboardEventType,
    Direction,
    Coordinate,
    Pixel,
    Vector2,
    Offset,
    Animations,
    Placement,
    SpriteSheetInfo,
};
