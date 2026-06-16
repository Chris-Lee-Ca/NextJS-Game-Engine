import React from "react";
import { Box } from "@mui/material";
import { PatrolDirection } from "@/game/types/placement";
import Image from "next/image";

const directionTransform: Record<PatrolDirection, string> = {
    right: "none",
    left: "scaleX(-1)",
    up: "none",
    down: "none",
};

const directionArrow: Record<PatrolDirection, string> = {
    left: "←",
    right: "→",
    up: "↑",
    down: "↓",
};

interface PatrolEnemyPreviewComponentProps {
    patrolDirection: PatrolDirection;
}

const PatrolEnemyPreviewComponent: React.FC<PatrolEnemyPreviewComponentProps> = ({ patrolDirection }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
            <Box sx={{ transform: directionTransform[patrolDirection], lineHeight: 0 }}>
                <Image
                    src="/sprites/patrol-enemy.svg"
                    alt="patrol enemy"
                    width={24}
                    height={22}
                    style={{ imageRendering: "pixelated", display: "block" }}
                />
            </Box>
            <Box sx={{ fontSize: "12px", lineHeight: 1, color: "#ffffff", fontWeight: "bold" }}>
                {directionArrow[patrolDirection]}
            </Box>
        </Box>
    );
};

export default PatrolEnemyPreviewComponent;
