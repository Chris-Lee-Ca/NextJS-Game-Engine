import { Direction, Position } from "@/game/types/general";
import { Config, ModuleHandler } from "..";
import { AppDispatch, AppStore, RootState } from "../../../store";
import { DIRECTION_COMMAND_MAPPING, DIRECTION_KEYS } from "./constants";
import { DirectionCommand, Facing } from "./types";
import GridHelper from "@/game/lib/helper/GridHelper";
import { MAIN_CHARACTER_MOVING_SPEED } from "@/game/lib/conts";
import { setFacing, setMainCharacterPixelPosition } from "./mainCharacterSlice";
import GeneralHelper from "@/game/lib/helper/GeneralHelper";

export class DirectionControlHandler extends ModuleHandler {
    private static instance: DirectionControlHandler;
    private store: AppStore | undefined;
    private dispatch: AppDispatch | undefined;
    private heldDirectionKeys: DirectionCommand[] = [];
    private activeDirectionKey: DirectionCommand = "";

    private constructor() {
        super();
    }

    public static getInstance(): DirectionControlHandler {
        if (!this.instance) {
            this.instance = new DirectionControlHandler();
        }
        return this.instance;
    }

    public init({ store, dispatch }: Config): void {
        this.store = store;
        this.dispatch = dispatch;
    }

    public deinit(): void {}

    public update(deltaTime: number) {
        if (typeof this.store === "undefined" || typeof this.dispatch === "undefined") {
            throw new Error('Please call "init" method for DirectionControlHandler');
        }
        const state = this.store.getState();

        this.heldDirectionKeys = this.getHeldDirectionKeys(state);
        this.activeDirectionKey = this.getActiveDirectionKey(this.heldDirectionKeys);
        const movementDirection = this.getMovementDirection(this.activeDirectionKey);
        const characterCurrentPixelPosition = state.mainCharacter.mainCharacterPixelPosition;

        const characterNewPixelPosition = this.getCharacterNewPixelPosition(
            characterCurrentPixelPosition,
            movementDirection,
            deltaTime
        );
        if (!GeneralHelper.isObjectDeepEqual(characterCurrentPixelPosition, characterNewPixelPosition)) {
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
        deltaTime: number
    ): Position {
        const gridSize = GridHelper.getGridSizeInPixel();
        const characterMovementPerLoop = (MAIN_CHARACTER_MOVING_SPEED * deltaTime) / gridSize;
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
