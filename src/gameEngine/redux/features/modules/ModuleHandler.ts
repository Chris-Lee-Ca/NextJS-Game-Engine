import { Config } from "./types";

/**
 * ModuleHandler Abstract Class
 *
 * This abstract class provides a blueprint for creating a module logic handler.
 * It enforces a singleton pattern and defines methods for initializing and deinitializing the handler.
 *
 * @abstract
 */
export abstract class ModuleHandler {
    /**
     * Singleton instance getter. Ensures a single instance of the handler exists.
     *
     * @abstract
     * @returns {KeyboardControlModule} The singleton instance.
     */
    public static getInstance(): ModuleHandler {
        throw new Error("getInstance must be implemented");
    }

    /**
     * Initializes the module handler.
     *
     * @abstract
     * @param {Config} config - The required configuration for initializing the module handler.
     */
    public abstract init(config: Config): void;

    /**
     * Deinitializes the module handler, freeing up any used resources.
     *
     * @abstract
     */
    public abstract deinit(): void;

    /**
     * Updates the module handlers during the game loop.
     *
     * @abstract
     * @param {number} deltaTime - The time elapsed (in milliseconds) since the last frame update.
     */
    public abstract update(deltaTime: number): void;
}
