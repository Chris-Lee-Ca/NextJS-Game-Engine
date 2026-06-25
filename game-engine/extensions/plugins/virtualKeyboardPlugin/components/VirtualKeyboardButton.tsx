"use client";

import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { VirtualKeyboardHandler } from "../VirtualKeyboardHandler";

export interface VirtualKeyboardButtonProps {
    keyCode: string;
    /** Additional key codes that should also light up this button (e.g. WASD aliases for arrow buttons). */
    aliasKeyCodes?: string[];
    handler: VirtualKeyboardHandler;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

/**
 * Engine-provided virtual keyboard button.
 *
 * Uses Pointer Events so it responds immediately on both mouse and touch
 * (no 300 ms synthetic mouse delay). Dispatches real DOM KeyboardEvents via
 * the handler so every plugin/module (DoubleTapRun, DirectionControl, etc.)
 * picks them up the same way it picks up physical key presses.
 *
 * Style via `className` or `style` — the engine applies no visual opinions.
 * A `data-active` attribute is set while the key is held so CSS selectors
 * ([data-active]) can drive hover/press styling.
 */
export const VirtualKeyboardButton = ({ keyCode, aliasKeyCodes, handler, children, className, style }: VirtualKeyboardButtonProps) => {
    const [isActive, setIsActive] = useState(false);
    // Tracks whether THIS button is the one currently being held so the global
    // pointerup handler only fires keyup for keys this button actually pressed.
    const isHeldRef = useRef(false);

    // Mirror the held state from DOM events — this covers both physical key presses
    // and virtual button presses (which also dispatch DOM events).
    useEffect(() => {
        const allKeys = [keyCode, ...(aliasKeyCodes ?? [])];
        const onKeyDown = (e: KeyboardEvent) => {
            if (allKeys.includes(e.key)) setIsActive(true);
        };
        const onKeyUp = (e: KeyboardEvent) => {
            if (allKeys.includes(e.key)) setIsActive(false);
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        };
    }, [keyCode, aliasKeyCodes]);

    // Global pointerup/pointercancel handles all release scenarios: normal release on the button,
    // pointer released after sliding off, touch-end anywhere on screen, and Safari's gesture
    // recognizer cancelling the pointer (fires pointercancel instead of pointerup) when it decides
    // an ambiguous touch is a scroll/pan rather than a tap — without this, the key could get stuck held.
    useEffect(() => {
        const onGlobalPointerEnd = () => {
            if (isHeldRef.current) {
                isHeldRef.current = false;
                handler.dispatchKeyUp(keyCode);
            }
        };
        window.addEventListener("pointerup", onGlobalPointerEnd);
        window.addEventListener("pointercancel", onGlobalPointerEnd);
        return () => {
            window.removeEventListener("pointerup", onGlobalPointerEnd);
            window.removeEventListener("pointercancel", onGlobalPointerEnd);
        };
    }, [keyCode, handler]);

    const handlePointerDown = (e: React.PointerEvent) => {
        // Prevent the browser from synthesising a mousedown/mouseup sequence
        // on touch devices, which would double-fire the key events.
        e.preventDefault();
        isHeldRef.current = true;
        handler.dispatchKeyDown(keyCode);
    };

    return (
        <button
            className={className}
            style={style}
            data-active={isActive || undefined}
            onPointerDown={handlePointerDown}
        >
            {children}
        </button>
    );
};
