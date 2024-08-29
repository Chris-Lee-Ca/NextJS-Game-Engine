import { SpriteSheetInfo } from "@/game/types/general";

export const animationSelector = (key: string): string => {
    switch (key) {
        case "up":
            return "walkUp";
        case "down":
            return "walkDown";
        case "left":
            return "walkLeft";
        case "right":
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
