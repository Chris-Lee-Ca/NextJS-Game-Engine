"use client";

import React, { useEffect } from "react";
import GameCanvas from "./GameCanvas";
import { useAppSelector } from "@/game/redux/hooks";
import { useCSSVariable } from "game-engine/hooks/useCSSVariable";
import GameLoop from "game-engine/core/GameLoop";
import { CUSTOM_STYLE } from "../lib/conts";
import { LEVEL_PLUGIN_ID, LevelHandler } from "game-engine/extensions/plugins/levelPlugin";
import StatusBar from "./StatusBar";
import Viewport from "./Viewport";
import DialogWindowFactory from "../components/dialog/DialogWindowFactory";
import ModalWindowFactory from "../components/modal/ModalWindowFactory";
import StyledAlert from "../components/template/StyledAlert";

const GameBody = ({ gameLoop }: { gameLoop: GameLoop }) => {
    const levelState = useAppSelector((state) => state[LEVEL_PLUGIN_ID]);
    const dialogState = useAppSelector((state) => state.dialog);
    const modalState = useAppSelector((state) => state.modal);
    const alertState = useAppSelector((state) => state.alert);
    const scaleFactor = useCSSVariable("--scale-factor"); //TODO make website responsive

    useEffect(() => {
        (gameLoop.plugins[LEVEL_PLUGIN_ID] as LevelHandler).loadLevel();
        gameLoop.start();
        return () => {
            gameLoop.stop();
        };
    }, [levelState.currentLevel, scaleFactor]);

    return (
        <>
            <StatusBar />
            {alertState.isOpenAlertWindow && <StyledAlert />}
            {dialogState.isOpenDialogWindow && <DialogWindowFactory windowType={dialogState.dialogWindowType as any} />}
            {modalState.isOpenModalWindow && <ModalWindowFactory windowType={modalState.modalWindowType as any} />}
            <Viewport
                backgroundColor={CUSTOM_STYLE.COLOR.MAIN_BLUE}
                top={CUSTOM_STYLE.SIZE.ACTION_BAR_HEIGHT}
                bottom={0}
                left={0}
                right={0}
            >
                <GameCanvas />
            </Viewport>
        </>
    );
};

export default GameBody;
