import ExtensionHandler from "../ExtensionHandler";

/**
 * PluginHandler Interface
 *
 * This interface provides a blueprint for creating a plugin logic handler.
 * It enforces the structure of methods for initializing, deinitializing, and updating the handler.
 *
 * @interface
 */
interface PluginHandler extends ExtensionHandler {
    /**
     * The ID of the plugin itself.
     */
    pluginId: string;
}

export default PluginHandler;
