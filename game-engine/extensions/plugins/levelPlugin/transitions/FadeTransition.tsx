"use client";

import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLevelTransition } from "../levelSlice";
import { LevelTransitionComponent } from "../types";

export interface FadeTransitionOptions {
    color?: string;
    revealDurationMs?: number;
    fallbackMs?: number;
}

type Phase = "idle" | "dark" | "revealing";

const TransitionOverlayBox = styled(Box)({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 250,
    pointerEvents: "none",
});

/**
 * Goes fully opaque the instant a level change starts, stays that way for as long as the new
 * level actually takes to load, and only fades back out once LevelHandler reports the load is
 * done.
 */
export const FadeTransition = (options: FadeTransitionOptions = {}): LevelTransitionComponent => {
    const { color = "#000", revealDurationMs = 250, fallbackMs = 5000 } = options;

    return function FadeTransitionComponent({ isTransitioning }: { isTransitioning: boolean }) {
        const dispatch = useDispatch();
        const [phase, setPhase] = useState<Phase>("idle");

        useEffect(() => {
            if (isTransitioning) {
                setPhase("dark");
                return;
            }
            setPhase((prev) => (prev === "dark" ? "revealing" : prev));
        }, [isTransitioning]);

        useEffect(() => {
            if (phase !== "dark") return;
            // Safety net only — endLevelTransition() should arrive from LevelHandler's loadLevel()
            // (the real "level finished loading" signal) well before this. Guards against a stuck
            // overlay if that signal is ever missed.
            const fallback = setTimeout(() => dispatch(endLevelTransition()), fallbackMs);
            return () => clearTimeout(fallback);
        }, [phase, dispatch]);

        useEffect(() => {
            if (phase !== "revealing") return;
            const timer = setTimeout(() => setPhase("idle"), revealDurationMs);
            return () => clearTimeout(timer);
        }, [phase]);

        if (phase === "idle") return null;

        return (
            <TransitionOverlayBox
                style={{
                    backgroundColor: color,
                    opacity: phase === "dark" ? 1 : 0,
                    transition: phase === "revealing" ? `opacity ${revealDurationMs}ms ease-in-out` : "none",
                }}
            />
        );
    };
};
