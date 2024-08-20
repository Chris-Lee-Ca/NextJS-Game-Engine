import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

import { Direction } from "@/lib/types";

export interface PlayerStateInterface {
    playerPosition: Direction;
}

interface PlayerStateContextInterface {
    playerState: PlayerStateInterface;
    setPlayerState: Dispatch<SetStateAction<PlayerStateInterface>>;
}

const initialState: PlayerStateInterface = {
    playerPosition: { x: 0, y: 0 },
};

const PlayerContext = createContext<PlayerStateContextInterface>({
    playerState: initialState,
    setPlayerState: () => {},
});

export const usePlayerState = () => {
    return useContext(PlayerContext);
};

export const updatePlayerPosition = (newDirection: Direction): void => {
    const { playerState, setPlayerState } = useContext(PlayerContext);
    // const oldPlayerPosition = playerState.playerPosition;
    // const newPlayerPosition = {
    //     x: oldPlayerPosition.x + newDirection.x,
    //     y: oldPlayerPosition.y + newDirection.y,
    // };
    // setPlayerState({ ...playerState, playerPosition: newPlayerPosition });
};

export const PlayerContextProvider = ({ children }: any) => {
    const [playerState, setPlayerState] =
        useState<PlayerStateInterface>(initialState);

    return (
        <>
            <PlayerContext.Provider value={{ playerState, setPlayerState }}>
                {children}
            </PlayerContext.Provider>
        </>
    );
};
