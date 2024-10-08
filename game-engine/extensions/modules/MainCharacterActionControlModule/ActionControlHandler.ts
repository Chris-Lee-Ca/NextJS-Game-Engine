import ModuleHandler from "../ModuleHandler";
import { AppDispatch, AppStore, RootState, setHeldActionKeys } from "./mainCharacterActionSlice";
import { KEYBOARD_EVENT_PLUGIN_ID } from "../../plugins/keyboardEventPlugin";
import { MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID } from "./constants";
import { ActionKeyMapping, InvertedActionKeyMapping } from "./types";

export interface ActionControlHandlerConfig {
    store: AppStore;
    dispatch: AppDispatch;
    actionKeyMapping: ActionKeyMapping;
}

export class ActionControlHandler implements ModuleHandler {
    public pluginId: string = KEYBOARD_EVENT_PLUGIN_ID;
    public moduleId: string = MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID;

    private store: AppStore;
    private dispatch: AppDispatch;
    private invertedKeyMapping: InvertedActionKeyMapping;

    public constructor({ store, dispatch, actionKeyMapping }: ActionControlHandlerConfig) {
        this.store = store;
        this.dispatch = dispatch;
        this.invertedKeyMapping = this.getInvertedActionKeyMapping(actionKeyMapping);
    }

    //TODO bug fix, when i open another browser with "K" (open resume), and release the key in another browser, since the onkeyup is not able to catch the event (it happens in another browser), the k key value is keey staying in the action control handler
    private getInvertedActionKeyMapping(actionKeyMapping: ActionKeyMapping): InvertedActionKeyMapping {
        const invertedKeyMapping: InvertedActionKeyMapping = {};
        Object.entries(actionKeyMapping).forEach(([keyType, keys]) => {
            keys.forEach((keyboardKey) => {
                if (keyboardKey in invertedKeyMapping) {
                    throw Error(`Keyboard Key: ${keyboardKey} is defined twice in ActionControlHandler`);
                }
                invertedKeyMapping[keyboardKey] = keyType;
            });
        });
        return invertedKeyMapping;
    }

    public init(): void {}

    public deinit(): void {}

    public update(deltaTime: number) {
        const state = this.store.getState();

        if (state[MAIN_CHARACTER_ACTION_CONTROL_MODULE_ID].disabled) {
            this.dispatch(setHeldActionKeys([]));
            return;
        }

        const heldActionKeys = this.getHeldActionKeys(state);
        this.dispatch(setHeldActionKeys(heldActionKeys));
    }

    private getHeldActionKeys(state: RootState): string[] {
        const heldKeys = state[KEYBOARD_EVENT_PLUGIN_ID].heldKeys;
        const heldActionKeys = heldKeys
            .filter((key) => key in this.invertedKeyMapping)
            .map((key) => this.invertedKeyMapping[key]);
        return heldActionKeys as string[];
    }
}

export default ActionControlHandler;
