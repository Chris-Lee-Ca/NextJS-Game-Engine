import { ReactNode } from "react";
import { PlayerContextProvider } from "./PlayerContext";

type AppContextProviderProps = { children?: ReactNode };

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    return (
        <>
            <PlayerContextProvider>{children}</PlayerContextProvider>
        </>
    );
};
