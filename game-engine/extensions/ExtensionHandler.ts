/**
 * ExtensionHandler Interface
 *
 * This interface provides a blueprint for creating a extension logic handler.
 * It enforces the structure of methods for initializing, deinitializing, and updating the handler.
 *
 * @interface
 */
interface ExtensionHandler {
    /**
     * Initializes the extension handler.
     */
    init(): void;

    /**
     * Deinitializes the extension handler, freeing up any used resources.
     */
    deinit(): void;

    /**
     * Updates the extension handlers during the game loop.
     *
     * @param {number} deltaTime - The time elapsed (in milliseconds) since the last frame update.
     */
    update(deltaTime: number): void;
}

export default ExtensionHandler;
