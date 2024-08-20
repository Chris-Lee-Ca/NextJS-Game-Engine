"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeGameStore, AppStore } from "../../redux/store";

export default function GameStoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeGameStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
