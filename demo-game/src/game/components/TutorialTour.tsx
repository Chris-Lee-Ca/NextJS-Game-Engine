"use client";

import { Joyride, CallBackProps, STATUS } from "react-joyride";
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
        disableBeacon: true,
    },
    {
        target: '[data-tour="backpack"]',
        title: "Backpack",
        content: "Items you collect on your journey appear here. Click any item to view it.",
        disableBeacon: true,
    },
    {
        target: "#level-navigator",
        title: "Level Navigator",
        content: "Use the arrow buttons to move between levels.",
        disableBeacon: true,
        spotlightPadding: 2,
    },
    {
        target: '[data-tour="edit-button"]',
        title: "Edit Mode",
        content:
            "Curious how this world is built? This is a developer tool — click it to explore and rearrange the layout. It's not part of the game itself.",
        disableBeacon: true,
    },
];

const TutorialTour = () => {
    const [run, setRun] = useState(true);
    const dispatch = useAppDispatch();
    const hasFinished = useRef(false);

    const handleCallback = (data: CallBackProps) => {
        const { status } = data;
        if (!hasFinished.current && ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
            hasFinished.current = true;
            setRun(false);
            // Delay opening the dialog so the "Done" click event doesn't propagate to the Modal backdrop and immediately close it.
            setTimeout(() => dispatch(openDialogWindow("intro")), 300);
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showSkipButton
            showProgress
            callback={handleCallback}
            locale={{
                last: "Done",
                skip: "Skip tour",
                next: "Next",
            }}
            styles={{
                options: {
                    overlayColor: "rgba(0, 0, 0, 0.7)",
                    primaryColor: "#2c3e50",
                    textColor: "#3d2b0a",
                    zIndex: 10000,
                },
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
