"use client";

import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useAppSelector } from "@/game/redux/hooks";
import { LEVEL_PLUGIN_ID } from "game-engine/extensions/plugins/levelPlugin";
import { useEffect, useRef, useState } from "react";
import { CUSTOM_STYLE } from "@/game/lib/conts";

const LEVEL_NAMES: Record<string, string> = {
    "intro-level-1": "Welcome",
    "resume-level-2": "Resume",
    "skills-level-3": "Skills",
    "education-level-4": "Education",
    "experience-level-5": "Work Experience",
    "project-level-6": "Projects",
    "finish-level-7": "Finish",
};

const fadeInOut = keyframes`
    0%   { opacity: 0; transform: translateY(-10px); }
    20%  { opacity: 1; transform: translateY(0); }
    80%  { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
`;

const AnnouncementBox = styled(Box)({
    position: "fixed",
    top: "18%",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    zIndex: 200,
    pointerEvents: "none",
});

const AnnouncementText = styled(Typography)({
    color: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "3px",
    textTransform: "uppercase",
    textShadow: "2px 2px 10px rgba(0,0,0,0.9)",
    background: "rgba(0,0,0,0.45)",
    padding: "8px 28px",
    borderRadius: "10px",
    backdropFilter: "blur(6px)",
    animation: `${fadeInOut} 2s ease-in-out forwards`,
});

const LevelAnnouncement = () => {
    const currentLevel = useAppSelector((state) => state[LEVEL_PLUGIN_ID].currentLevel);
    const [displayName, setDisplayName] = useState<string | null>(null);
    const prevLevelRef = useRef<string>("");

    useEffect(() => {
        if (!currentLevel || currentLevel === prevLevelRef.current) return;
        prevLevelRef.current = currentLevel;

        const name = LEVEL_NAMES[currentLevel];
        if (!name) return;

        setDisplayName(name);
        const timer = setTimeout(() => setDisplayName(null), 2000);
        return () => clearTimeout(timer);
    }, [currentLevel]);

    if (!displayName) return null;

    return (
        <AnnouncementBox>
            <AnnouncementText key={displayName}>{displayName}</AnnouncementText>
        </AnnouncementBox>
    );
};

export default LevelAnnouncement;
