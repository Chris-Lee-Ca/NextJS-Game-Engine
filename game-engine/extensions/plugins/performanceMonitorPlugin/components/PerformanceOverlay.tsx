"use client";

import { Box } from "@mui/material";
import { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { PERFORMANCE_MONITOR_PLUGIN_ID } from "../constants";
import { PerformanceMonitorState } from "../performanceMonitorSlice";

export interface PerformanceOverlayProps {
    style?: CSSProperties;
}

const defaultStyle: CSSProperties = {
    position: "fixed",
    top: "8px",
    right: "8px",
    zIndex: 150,
    pointerEvents: "none",
    background: "rgba(0,0,0,0.65)",
    color: "#00ff88",
    fontFamily: "monospace",
    fontSize: "12px",
    lineHeight: "1.6",
    padding: "6px 10px",
    borderRadius: "4px",
    userSelect: "none",
};

export const PerformanceOverlay = ({ style }: PerformanceOverlayProps) => {
    const visible = useSelector(
        (state: Record<typeof PERFORMANCE_MONITOR_PLUGIN_ID, PerformanceMonitorState>) =>
            state[PERFORMANCE_MONITOR_PLUGIN_ID].visible,
    );
    const fps = useSelector(
        (state: Record<typeof PERFORMANCE_MONITOR_PLUGIN_ID, PerformanceMonitorState>) =>
            state[PERFORMANCE_MONITOR_PLUGIN_ID].fps,
    );

    if (!visible) return null;

    return (
        <Box style={{ ...defaultStyle, ...style }}>
            <div>FPS: {fps > 0 ? fps.toFixed(1) : "---"}</div>
        </Box>
    );
};
