type Direction = {
    x: number;
    y: number
}

type GameObject = {
    id: number;
    position: { x: number, y: number };
    update(deltaTime: number): void; // Pass deltaTime for smoother updates
}

export type {Direction, GameObject};
