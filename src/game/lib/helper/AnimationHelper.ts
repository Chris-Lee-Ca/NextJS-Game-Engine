class AnimationHelper {
    /**
     * Selects the appropriate animation based on the given direction key.
     * @param {string} key - The direction key (e.g., "up", "down", "left", "right").
     * @returns {string} - The corresponding animation string.
     */
    static animationSelector(key: string): string {
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
    }
}

export default AnimationHelper;
