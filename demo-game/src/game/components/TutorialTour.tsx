"use client";

import { Joyride, EventData, STATUS } from "react-joyride";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/game/redux/hooks";
import { openDialogWindow } from "@/game/redux/features/dialogSlice";

const steps = [
    {
        target: "body",
        placement: "center" as const,
        title: "Welcome!",
        content:
            "This world is built with TypeScript, Next.js, and MUI. Before you explore, here's a quick look at the tools available to you.",
        skipBeacon: true,
    },
    {
        target: '[data-tour="backpack"]',
        title: "Backpack",
        content: "Items you collect on your journey appear here. Click any item to view it.",
        skipBeacon: true,
    },
    {
        target: "#level-navigator",
        title: "Level Navigator",
        content: "Use the arrow buttons to move between levels.",
        skipBeacon: true,
        spotlightPadding: 2,
    },
    {
        target: '[data-tour="edit-button"]',
        title: "Edit Mode",
        content:
            "Curious how this world is built? This is a developer tool — click it to explore and rearrange the layout. It's not part of the game itself.",
        skipBeacon: true,
    },
];

const TutorialTour = () => {
    const [run, setRun] = useState(true);
    const dispatch = useAppDispatch();
    const hasFinished = useRef(false);

    const handleCallback = (data: EventData) => {
        const { status } = data;
        if (!hasFinished.current && ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
            hasFinished.current = true;
            setRun(false);
            // Delay opening the dialog so the "Done" click event doesn't propagate to the Modal backdrop and immediately close it.
            setTimeout(() => dispatch(openDialogWindow("intro")), 300);
        }
    };

    if (!run) return null;

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            onEvent={handleCallback}
            locale={{
                last: "Done",
                next: "Next",
            }}
            options={{
                overlayColor: "rgba(0, 0, 0, 0.7)",
                primaryColor: "#2c3e50",
                textColor: "#3d2b0a",
                zIndex: 10000,
                buttons: ["back", "close", "primary"],
                closeButtonAction: "skip",
                showProgress: true,
            }}
            styles={{
                tooltip: {
                    borderRadius: "10px",
                },
                tooltipTitle: {
                    fontWeight: "bold",
                    fontSize: "16px",
                },
            }}
        />
    );
};

export default TutorialTour;
