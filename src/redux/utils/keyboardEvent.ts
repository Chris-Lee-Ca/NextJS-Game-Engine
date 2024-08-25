import { Direction, KeyboardEventType } from "@/types/general";
import { setMainCharacterPosition } from "../features/mainCharacterSlice";
import { clearPlayerKeyboardEvent, setPlayerKeyboardEvent } from "../features/playerSlice";
import { AppDispatch } from "../store";

export const keyBoardEventHandler = (keyboardEvent: KeyboardEventType, key: string) => (dispatch: AppDispatch) => {
    const updateMainCharacterPosition = (direction: Direction) => dispatch(setMainCharacterPosition(direction));

    switch (keyboardEvent) {
        case "keydown":
            dispatch(setPlayerKeyboardEvent(key));
            switch (key) {
                case "ArrowUp":
                    updateMainCharacterPosition({ x: 0, y: -1 });
                    break;
                case "ArrowDown":
                    updateMainCharacterPosition({ x: 0, y: 1 });
                    break;
                case "ArrowLeft":
                    updateMainCharacterPosition({ x: -1, y: 0 });
                    break;
                case "ArrowRight":
                    updateMainCharacterPosition({ x: 1, y: 0 });
                    break;
            }
            break;
        case "keyup":
            dispatch(clearPlayerKeyboardEvent(key));
            updateMainCharacterPosition({ x: 0, y: 0 });
            break
    }
  };