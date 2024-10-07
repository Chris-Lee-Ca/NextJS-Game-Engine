import ModuleHandler from "../ModuleHandler";
import { AppDispatch, AppStore, RootState } from "./mainCharacterSlice";
import { MAIN_CHARACTER_CONTROL_MODULE_ID } from "./constants";
import { DirectionCommand, DirectionKeyMapping, InvertedDirectionKeyMapping } from "./types";
import { setMovmentDirection } from "./mainCharacterSlice";
import { KEYBOARD_EVENT_PLUGIN_ID } from "../../plugins/keyboardEventPlugin";

export interface DirectionControlHandlerConfig {
    store: AppStore;
    dispatch: AppDispatch;
    directionKeyMapping: DirectionKeyMapping;
}

export class DirectionControlHandler implements ModuleHandler {
    public pluginId: string = KEYBOARD_EVENT_PLUGIN_ID;
    public moduleId: string = MAIN_CHARACTER_CONTROL_MODULE_ID;

    private store: AppStore;
    private dispatch: AppDispatch;
    private invertedKeyMapping: InvertedDirectionKeyMapping; 

    public constructor({ store, dispatch, directionKeyMapping }: DirectionControlHandlerConfig) {
        this.store = store;
        this.dispatch = dispatch;
        this.invertedKeyMapping = this.getInvertedKeyMapping(directionKeyMapping);
    }

    private getInvertedKeyMapping(directionKeyMapping: DirectionKeyMapping): InvertedDirectionKeyMapping{
        const invertedKeyMapping: InvertedDirectionKeyMapping = {};
        Object.entries(directionKeyMapping).forEach(([keyType, keys]) => {
            keys.forEach((keyboardKey) => {
                if (keyboardKey in invertedKeyMapping){
                    throw Error (`Keyboard Key: ${keyboardKey} is defined twice in ActionControlHandler`);
                }
                invertedKeyMapping[keyboardKey] = keyType as DirectionCommand;
            })
        });
        return invertedKeyMapping;
    }

    public init(): void {}

    public deinit(): void {}

    public update(deltaTime: number) {
        const state = this.store.getState();

        if (state[MAIN_CHARACTER_CONTROL_MODULE_ID].disabled) {
            this.dispatch(setMovmentDirection(""));
            return;
        }

        const heldDirectionKeys = this.getHeldDirectionKeys(state);
        const movementDirection = this.getActiveDirectionKey(heldDirectionKeys);
        const oldMovmentDirection = state[MAIN_CHARACTER_CONTROL_MODULE_ID].movementDirection;
        if (movementDirection !== oldMovmentDirection) {
            this.dispatch(setMovmentDirection(movementDirection));
        }
    }

    private getHeldDirectionKeys(state: RootState): DirectionCommand[] {
        const heldKeys = state[KEYBOARD_EVENT_PLUGIN_ID].heldKeys;
        const heldDirectionKeys = heldKeys.filter((key) => key in this.invertedKeyMapping).map((key) => this.invertedKeyMapping[key]);
        return heldDirectionKeys as DirectionCommand[];
    }

    private getActiveDirectionKey(heldDirectionKeys: DirectionCommand[]): DirectionCommand {
        if (heldDirectionKeys.length === 0) return "";
        return heldDirectionKeys[0];
    }
}

export default DirectionControlHandler;
