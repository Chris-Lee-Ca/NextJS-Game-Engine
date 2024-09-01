import { Direction } from "@/game/types/general";
import { setMainCharacterPosition } from "../features/mainCharacterSlice";
import { setPlayerKeyboardEvent } from "../features/playerSlice";
import { AppDispatch } from "../store";

class KeyBoardEventHandler {
    private static instance: KeyBoardEventHandler;
    private dispatch: AppDispatch | undefined;
    private keyMapping: { [key: string]: string } = {
        ArrowUp: "up",
        KeyW: "up",
        ArrowDown: "down",
        KeyS: "down",
        ArrowLeft: "left",
        KeyA: "left",
        ArrowRight: "right",
        KeyD: "right",
    };
    private commandMapping: { [key: string]: Direction } = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
    };
    public heldDirections: string[] = [];

    private constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new KeyBoardEventHandler();
        }
        return this.instance;
    }

    private getDirection() {
        if (this.heldDirections.length === 0) return "";
        return this.heldDirections[0];
    }

    public init(dispatch: AppDispatch) {
        this.dispatch = dispatch;
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    public deinit() {
        window.removeEventListener("keyup", this.handleKeyUp.bind(this));
        window.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    private updatePlayerKeyboardEvent(direction: string) {
        if (typeof this.dispatch === "undefined") {
            throw new Error('Please call "init" method for KeyBoardEventHandler');
        }
        this.dispatch(setPlayerKeyboardEvent(direction));
    }

    private updateMainCharacterPosition(direction: Direction) {
        if (typeof this.dispatch === "undefined") {
            throw new Error('Please call "init" method for KeyBoardEventHandler');
        }
        this.dispatch(setMainCharacterPosition(direction));
    }

    private handleKeyUp(event: KeyboardEvent): void {
        if (!(event.key in this.keyMapping)) {
            return;
        }
        const dir = this.keyMapping[event.key];
        this.heldDirections = this.heldDirections.filter((direction) => direction !== dir);
        this.updatePlayerKeyboardEvent(this.getDirection());
        this.keyBoardEventHandler(this.getDirection());
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (!(event.key in this.keyMapping)) {
            return;
        }
        const dir = this.keyMapping[event.key];
        if (!this.heldDirections.includes(dir)) {
            this.heldDirections.unshift(dir);
        }
        this.updatePlayerKeyboardEvent(this.getDirection());
        this.keyBoardEventHandler(this.getDirection());
    }

    private keyBoardEventHandler(direction: string) {
        if (!(direction in this.commandMapping)) return;
        this.updateMainCharacterPosition(this.commandMapping[direction]);
    }
}

export default KeyBoardEventHandler;
