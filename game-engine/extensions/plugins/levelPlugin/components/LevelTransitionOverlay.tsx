"use client";

import { useSelector } from "react-redux";
import { LEVEL_PLUGIN_ID } from "../constants";
import { LevelStateInterface } from "../levelSlice";
import { LevelTransitionComponent } from "../types";

export interface LevelTransitionOverlayProps {
    transition?: LevelTransitionComponent;
}

export const LevelTransitionOverlay = ({ transition: Transition }: LevelTransitionOverlayProps) => {
    const isTransitioning = useSelector(
        (state: Record<typeof LEVEL_PLUGIN_ID, LevelStateInterface>) => state[LEVEL_PLUGIN_ID].isTransitioning,
    );

    if (!Transition) return null;

    return <Transition isTransitioning={isTransitioning} />;
};
