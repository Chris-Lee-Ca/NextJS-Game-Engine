"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { AppStore, reduxStore } from "../redux/store";
import { fetchGameContent } from "../redux/features/gameContentSlice";

interface GameStoreProviderProps {
    children: ReactNode;
}

export default function GameStoreProvider(props: GameStoreProviderProps) {
    const { children } = props;
    const storeRef = useRef<AppStore>(reduxStore);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Dispatch fetchGameContent and wait for it to complete
        storeRef.current.dispatch(fetchGameContent()).then(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return null;
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
