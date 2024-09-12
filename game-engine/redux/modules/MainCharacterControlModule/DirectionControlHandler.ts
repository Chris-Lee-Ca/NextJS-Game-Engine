import { ModuleHandler } from "..";
import { AppDispatch, AppStore, RootState } from "../../store";
import { DIRECTION_KEYS } from "./constants";
import { DirectionCommand, Facing } from "./types";
import { setMovmentDirection } from "./mainCharacterSlice";

export interface DirectionControlHandlerConfig {
    store: AppStore;
    dispatch: AppDispatch;
}

export class DirectionControlHandler extends ModuleHandler {
    private store: AppStore;
    private dispatch: AppDispatch;

    public constructor({ store, dispatch }: DirectionControlHandlerConfig) {
        super();
        this.store = store;
        this.dispatch = dispatch;
    }

    public init(): void {}

    public deinit(): void {}

    public update(deltaTime: number) {
        const state = this.store.getState();

        const heldDirectionKeys = this.getHeldDirectionKeys(state);
        const movementDirection = this.getActiveDirectionKey(heldDirectionKeys);
        const oldMovmentDirection = state.mainCharacter.movmentDirection;
        if (movementDirection !== oldMovmentDirection) {
            this.dispatch(setMovmentDirection(movementDirection));
        }
    }

    private getHeldDirectionKeys(state: RootState): DirectionCommand[] {
        const heldKeys = state.keyboardControl.heldKeys;
        const heldDirectionKeys = heldKeys.filter((key) => DIRECTION_KEYS.includes(key as any)) as DirectionCommand[];
        return heldDirectionKeys;
    }

    private getActiveDirectionKey(heldDirectionKeys: DirectionCommand[]): DirectionCommand {
        if (heldDirectionKeys.length === 0) return "";
        return heldDirectionKeys[0];
    }
}

export default DirectionControlHandler;
