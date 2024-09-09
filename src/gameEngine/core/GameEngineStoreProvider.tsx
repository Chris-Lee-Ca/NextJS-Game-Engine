"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeGameEngineStore, AppStore } from "../redux/store";

export default function GameEngineStoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeGameEngineStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
