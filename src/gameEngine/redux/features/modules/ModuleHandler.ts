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
     * Initializes the module handler.
     *
     * @abstract
     */
    public abstract init(): void;

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
