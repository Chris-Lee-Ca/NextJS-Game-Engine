import ExtensionHandler from "../ExtensionHandler";

/**
 * ModuleHandler Interface
 *
 * This interface provides a blueprint for creating a module logic handler.
 * It enforces the structure of methods for initializing, deinitializing, and updating the handler.
 *
 * @interface
 */
interface ModuleHandler extends ExtensionHandler {
    /**
     * The ID of the plugin that this module extends.
     */
    pluginId: string;
    /**
     * The ID of the module itself.
     */
    moduleId: string;
}

export default ModuleHandler;
