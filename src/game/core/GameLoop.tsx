"use client";

import { useAppDispatch } from "@/game/redux/hooks";
import KeyBoardEventHandler from "@/game/redux/utils/keyboardEvent";
import { GameObject } from "@/game/types/general";
import React, { useState, useEffect, useRef, ReactNode } from "react";

type GameLoopProps = { children?: ReactNode };

const GameLoop = ({ children }: GameLoopProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const keyBoardEventHandler = KeyBoardEventHandler.getInstance();
        keyBoardEventHandler.init(dispatch);

        return () => {
            keyBoardEventHandler.deinit();
        };
    }, []);

    return <div>{children}</div>;
};

export default GameLoop;
