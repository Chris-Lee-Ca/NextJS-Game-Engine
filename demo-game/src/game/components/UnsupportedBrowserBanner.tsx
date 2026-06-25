"use client";

import React, { useEffect, useRef } from "react";
import Alert from "@mui/material/Alert";

interface UnsupportedBrowserBannerProps {
    onDismiss: () => void;
    // Reports the banner's actual rendered height (it wraps to 2+ lines on narrow
    // viewports) so GameBody can push the fixed game Viewport down by exactly that much.
    onHeightChange: (height: number) => void;
}

// Sits in normal document flow above StatusBar (not fixed/absolute) so the layout
// naturally pushes everything below it down — GameBody compensates by adding this
// banner's measured height to the fixed game Viewport's `top` offset while it's shown.
const UnsupportedBrowserBanner: React.FC<UnsupportedBrowserBannerProps> = ({ onDismiss, onHeightChange }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => onHeightChange(entry.target.getBoundingClientRect().height));
        observer.observe(el);
        return () => observer.disconnect();
    }, [onHeightChange]);

    return (
        <Alert
            ref={ref}
            data-testid="unsupported-browser-banner"
            severity="warning"
            variant="filled"
            onClose={onDismiss}
            sx={{
                borderRadius: 0,
                alignItems: "center",
                py: 1.5,
                lineHeight: 1.6,
                "& .MuiAlert-message": {
                    width: "100%",
                    textAlign: "center",
                },
            }}
        >
            <strong>Best experienced in Chrome.</strong> As a personal project, I prioritized building new features over
            exhaustive cross-browser testing. Other browsers may show occasional visual or performance quirks.
        </Alert>
    );
};

export default UnsupportedBrowserBanner;
