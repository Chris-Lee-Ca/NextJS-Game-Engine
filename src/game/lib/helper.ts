import { SpriteSheetInfo } from "@/game/types/general";

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

export const spritePositionToImagePosition = (
    row: number,
    col: number,
    spriteSheetInfo: SpriteSheetInfo,
    imageOffset: { x: number; y: number }
) => {
    return {
        x: imageOffset.x + spriteSheetInfo.BORDER + col * spriteSheetInfo.WIDTH,
        y: imageOffset.y + spriteSheetInfo.BORDER + row * (spriteSheetInfo.SPACING + spriteSheetInfo.HEIGHT),
    };
};
