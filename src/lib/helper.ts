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
