import { SPRITE_SHEET } from "./conts";

export const animationSelector = (key: string): string => {
    switch (key) {
        case "ArrowUp":
            return "walkUp";
        case "ArrowDown":
            return "walkDown";
        case "ArrowLeft":
            return "walkLeft";
        case "ArrowRight":
            return "walkRight";
        default:
            return "idleDown";
    }
};

export const spritePositionToImagePosition = (row: number, col: number, imageOffset: { x: number; y: number }) => {
    return {
        x: imageOffset.x + SPRITE_SHEET.BORDER + col * SPRITE_SHEET.WIDTH,
        y: imageOffset.y + SPRITE_SHEET.BORDER + row * (SPRITE_SHEET.SPACING + SPRITE_SHEET.HEIGHT),
    };
};
