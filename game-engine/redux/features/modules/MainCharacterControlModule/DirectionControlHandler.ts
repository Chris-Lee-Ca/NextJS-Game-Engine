import { Direction, Position } from "../../../../types/general";
import { ModuleHandler } from "..";
import { AppDispatch, AppStore, RootState } from "../../../store";
import { DIRECTION_COMMAND_MAPPING, DIRECTION_KEYS } from "./constants";
import { DirectionCommand, Facing } from "./types";
import { setFacing, setMainCharacterPixelPosition } from "./mainCharacterSlice";
import { isObjectDeepEqual } from "./helper";
import GridHelper from "../../../../helper/GridHelper";

export interface DirectionControlHandlerConfig {
    store: AppStore;
    dispatch: AppDispatch;
}

export class DirectionControlHandler extends ModuleHandler {
    private store: AppStore;
    private dispatch: AppDispatch;
    private heldDirectionKeys: DirectionCommand[] = [];
    private activeDirectionKey: DirectionCommand = "";

    public constructor({ store, dispatch }: DirectionControlHandlerConfig) {
        super();
        this.store = store;
        this.dispatch = dispatch;
    }

    public init(): void {}

    public deinit(): void {}

    public update(deltaTime: number) {
        const state = this.store.getState();

        this.heldDirectionKeys = this.getHeldDirectionKeys(state);
        this.activeDirectionKey = this.getActiveDirectionKey(this.heldDirectionKeys);
        const movementDirection = this.getMovementDirection(this.activeDirectionKey);
        const characterMovingSpeed = state.mainCharacter.mainCharacterMovingSpeed;
        const characterCurrentPixelPosition = state.mainCharacter.mainCharacterPixelPosition;

        const characterNewPixelPosition = this.getCharacterNewPixelPosition(
            characterCurrentPixelPosition,
            movementDirection,
            characterMovingSpeed,
            deltaTime
        );
        if (!isObjectDeepEqual(characterCurrentPixelPosition, characterNewPixelPosition)) {
            this.dispatch(setMainCharacterPixelPosition(characterNewPixelPosition));
        }
        const currentFacing = state.mainCharacter.facing;
        const newFacing = this.getFacing(this.activeDirectionKey);
        if (currentFacing !== newFacing) {
            this.dispatch(setFacing(newFacing));
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

    private getMovementDirection(activeDirectionKey: DirectionCommand): Direction {
        return DIRECTION_COMMAND_MAPPING[activeDirectionKey];
    }

    private getCharacterNewPixelPosition(
        characterCurrentPixelPosition: Position,
        movementDirection: Direction,
        characterMovingSpeed: number,
        deltaTime: number
    ): Position {
        const gridSize = GridHelper.getGridSizeInPixel();
        const characterMovementPerLoop = (characterMovingSpeed * deltaTime) / gridSize;
        return {
            x: characterCurrentPixelPosition.x + movementDirection.x * characterMovementPerLoop,
            y: characterCurrentPixelPosition.y + movementDirection.y * characterMovementPerLoop,
        };
    }

    private getFacing(activeDirectionKey: DirectionCommand): Facing {
        switch (activeDirectionKey) {
            case "up":
                return "up";
            case "down":
                return "down";
            case "left":
                return "left";
            case "right":
                return "right";
            case "":
                return "none";
            default:
                const facing: never = activeDirectionKey;
                throw new Error(`Unknown activeDirectionKey ${activeDirectionKey}`);
        }
    }
}

export default DirectionControlHandler;
