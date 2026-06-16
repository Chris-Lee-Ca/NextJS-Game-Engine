"use client";

import React from "react";
import { Box, styled } from "@mui/material";
import { keyframes } from "@mui/system";
import GridHelper from "game-engine/helper/GridHelper";
import { Vector2 } from "game-engine/types/general";
import Rectangle from "game-engine/components/Rectangle";
import Bound from "@/game/components/Bound";
import { useAppSelector } from "@/game/redux/hooks";
import { PatrolDirection } from "@/game/types/placement";
import Image from "next/image";

const G = GridHelper.getGridSizeInPixel(); // 64px

// SVG natural size: 48×44px (12 cols × 11 rows at 4px/pixel)
const SPRITE_W = 48;
const SPRITE_H = 44;

const bounce = keyframes`
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
`;

const Container = styled(Box)({
    position: "relative",
    width: `${G}px`,
    height: `${G}px`,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
});

const facingTransform: Record<PatrolDirection, string> = {
    right: "none",
    left: "scaleX(-1)",
    up: "none",
    down: "none",
};

const FacingWrapper = styled(Box)<{ facing: PatrolDirection }>(({ facing }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "4px",
    transform: facingTransform[facing],
}));

const BounceWrapper = styled(Box)({
    animation: `${bounce} 0.7s ease-in-out infinite`,
});

const GroundShadow = styled(Box)({
    width: "30px",
    height: "5px",
    background: "rgba(0,0,0,0.20)",
    borderRadius: "50%",
    marginTop: "1px",
});

interface PatrolEnemyComponentProps {
    position: Vector2;
    bound: Rectangle;
    facing: PatrolDirection;
}

const PatrolEnemyComponent: React.FC<PatrolEnemyComponentProps> = ({ position, bound, facing }) => {
    const devMode = useAppSelector((state) => state.game.devMode);

    return (
        <Container>
            {devMode && <Bound position={position} rectangle={bound} color="orange" />}
            <FacingWrapper facing={facing}>
                <BounceWrapper>
                    <Image
                        src="/sprites/patrol-enemy.svg"
                        alt="patrol enemy"
                        width={SPRITE_W}
                        height={SPRITE_H}
                        style={{ imageRendering: "pixelated", display: "block" }}
                    />
                </BounceWrapper>
                <GroundShadow />
            </FacingWrapper>
        </Container>
    );
};

export default PatrolEnemyComponent;
