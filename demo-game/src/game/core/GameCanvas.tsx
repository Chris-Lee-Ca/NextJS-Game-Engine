"use client";

import Sprite from "game-engine/components/Sprite/Sprite";
import { CUSTOM_STYLE, MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import { useAppSelector } from "@/game/redux/hooks";
import { CanvasHelper, LevelInfo } from "game-engine/redux/modules/levelModule";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { CSSProperties } from "react";
import GridHelper from "game-engine/helper/GridHelper";
import SpriteHelper from "game-engine/helper/SpriteHelper";
import { selectCurrentLevelInfo } from "game-engine/redux/modules/levelModule";
import ObjectPool from "game-engine/core/ObjectPool";
import BackgroundTile from "../components/BackgroundTile";

type GameCanvasProps = {};

const Canvas = styled(Box)({});

const GameCanvas = (props: GameCanvasProps) => {
    useAppSelector((state) => state.core.time); //Subscribe "core time" to update the canvas every game loop
    const levelInfo = useAppSelector(selectCurrentLevelInfo);
    const gridSide = GridHelper.getGridSizeInPixel();

    const mainCharacterId = CanvasHelper.findMainCharacterId(levelInfo);
    const mainCharacter = ObjectPool.get(mainCharacterId);
    const canvasBaseOffset = CanvasHelper.getCanvasBaseOffset();

    return (
        <Canvas
            style={{
                transform: `translate(
                        ${-canvasBaseOffset.x - mainCharacter!.position.x}px,
                        ${-canvasBaseOffset.y - mainCharacter!.position.y}px
                        )`,
            }}
        >
            {/* Background */}
            {Array.from({ length: levelInfo.tilesWidth }).map((_, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {Array.from({ length: levelInfo.tilesHeight }).map((_, colIndex) => (
                        <BackgroundTile
                            key={`${rowIndex}-${colIndex}`}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            gridSide={gridSide}
                            theme={levelInfo.theme}
                            tilesWidth={levelInfo.tilesWidth}
                            tilesHeight={levelInfo.tilesHeight}
                        />
                    ))}
                </div>
            ))}
            {/* Game Object */}
            {levelInfo.placements.map((placement, index) => {
                const object = ObjectPool.get(placement.id);
                return (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            transform: `translate(
                                    ${object?.position.x}px,
                                    ${object?.position.y}px
                                    )`,
                        }}
                    >
                        {object?.render()}
                    </div>
                );
            })}
        </Canvas>
    );
};

export default GameCanvas;
