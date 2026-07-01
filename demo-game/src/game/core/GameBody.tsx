"use client";

import React, { useCallback, useEffect, useState } from "react";
import GameCanvas from "./GameCanvas";
import { useAppSelector } from "@/game/redux/hooks";
import { useCSSVariable } from "game-engine/hooks/useCSSVariable";
import GameLoop from "game-engine/core/GameLoop";
import { CUSTOM_STYLE } from "../lib/conts";
import { LEVEL_PLUGIN_ID, LevelHandler, LevelTransitionOverlay } from "game-engine/extensions/plugins/levelPlugin";
import StatusBar from "./StatusBar";
import Viewport from "./Viewport";
import DialogWindowFactory from "../components/dialog/DialogWindowFactory";
import ModalWindowFactory from "../components/modal/ModalWindowFactory";
import StyledAlert from "../components/template/StyledAlert";
import VirtualKeyboard from "../components/VirtualKeyboard";
import { VIRTUAL_KEYBOARD_PLUGIN_ID, VirtualKeyboardHandler } from "game-engine/extensions/plugins/virtualKeyboardPlugin";
import LevelAnnouncement from "../components/LevelAnnouncement";
import TutorialTour from "../components/TutorialTour";
import UnsupportedBrowserBanner from "../components/UnsupportedBrowserBanner";
import { PerformanceOverlay } from "game-engine/extensions/plugins/performanceMonitorPlugin";

const GameBody = ({ gameLoop }: { gameLoop: GameLoop }) => {
    const levelState = useAppSelector((state) => state[LEVEL_PLUGIN_ID]);
    const dialogState = useAppSelector((state) => state.dialog);
    const modalState = useAppSelector((state) => state.modal);
    const alertState = useAppSelector((state) => state.alert);
    const scaleFactor = useCSSVariable("--scale-factor"); //TODO make website responsive

    const virtualKeyboardHandler = gameLoop.plugins[VIRTUAL_KEYBOARD_PLUGIN_ID] as VirtualKeyboardHandler;
    const levelHandler = gameLoop.plugins[LEVEL_PLUGIN_ID] as LevelHandler;

    const [showBrowserWarning, setShowBrowserWarning] = useState(false);
    const [bannerHeight, setBannerHeight] = useState(0);

    useEffect(() => {
        // Check if the user is using Chrome — Chrome is the only browser this engine is tested against.
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        setShowBrowserWarning(!isChrome);
    }, []);

    // Measured (not assumed) since the banner's text can wrap to 2-3 lines depending on viewport width.
    const handleBannerHeightChange = useCallback((height: number) => setBannerHeight(height), []);

    const viewportTop = showBrowserWarning
        ? CUSTOM_STYLE.SIZE.ACTION_BAR_HEIGHT + bannerHeight
        : CUSTOM_STYLE.SIZE.ACTION_BAR_HEIGHT;

    useEffect(() => {
        (gameLoop.plugins[LEVEL_PLUGIN_ID] as LevelHandler).loadLevel();
        gameLoop.start();
        return () => {
            gameLoop.stop();
        };
    }, [levelState.currentLevel, scaleFactor, gameLoop]);

    return (
        <>
            {showBrowserWarning && (
                <UnsupportedBrowserBanner
                    onDismiss={() => setShowBrowserWarning(false)}
                    onHeightChange={handleBannerHeightChange}
                />
            )}
            <TutorialTour />
            <LevelAnnouncement />
            <PerformanceOverlay style={{ top: "auto", bottom: "8px" }} />
            <LevelTransitionOverlay transition={levelHandler.transition} />
            <StatusBar />
            {alertState.isOpenAlertWindow && <StyledAlert />}
            {dialogState.isOpenDialogWindow && <DialogWindowFactory windowType={dialogState.dialogWindowType!} />}
            {modalState.isOpenModalWindow && <ModalWindowFactory windowType={modalState.modalWindowType!} />}
            <Viewport
                backgroundColor={CUSTOM_STYLE.COLOR.MAIN_BLUE}
                top={viewportTop}
                bottom={0}
                left={0}
                right={0}
            >
                <GameCanvas />
            </Viewport>
            <VirtualKeyboard virtualKeyboardHandler={virtualKeyboardHandler} />
        </>
    );
};

export default GameBody;
