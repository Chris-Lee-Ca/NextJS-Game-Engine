type KeyboardEventType = "keydown" | "keyup";

type Direction = {
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
type Theme = {};

type Tile = {};
type Pickup = {};
type Enemy = {};

type Objectformation = {
    x: number;
    y: number;
    type: Tile | Pickup | Enemy;
};

type Level = {
    theme: Theme;
    tilesWidth: number;
    tilesHeight: number;
    placements: Objectformation[];
};

export type {
    KeyboardEventType,
    Direction,
    GameObject,
    Animations,
    Objectformation,
    Level,
};
