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

type GameCanvasProps = {};

const Canvas = styled(Box)({});

const GameCanvas = (props: GameCanvasProps) => {
    useAppSelector((state) => state.core.time); //Subscribe "core time" to update the canvas every game loop
    const levelInfo = useAppSelector(selectCurrentLevelInfo);
    const gridSide = GridHelper.getGridSizeInPixel();

    const handleTileBorderStyle = (row: number, col: number, levelInfo: LevelInfo, isCliff: Boolean): CSSProperties => {
        let borderStyle: CSSProperties = {};
        const mapBorder = CUSTOM_STYLE.BORDER.MAP_BORDER;
        const gridBorder = CUSTOM_STYLE.BORDER.GRID_BORDER;

        borderStyle["borderTop"] = gridBorder;
        borderStyle["borderLeft"] = gridBorder;
        borderStyle["borderRight"] = gridBorder;
        borderStyle["borderBottom"] = gridBorder;

        if (row === 0) borderStyle["borderLeft"] = mapBorder;
        if (col === 0) borderStyle["borderTop"] = mapBorder;
        if (row === levelInfo.tilesWidth - 1) borderStyle["borderRight"] = mapBorder;
        if (isCliff) borderStyle["borderBottom"] = mapBorder;

        return borderStyle;
    };

    const handleBackgroudTileStyle = (
        row: number,
        col: number,
        levelInfo: LevelInfo,
        isCliff: boolean
    ): CSSProperties => {
        let style: CSSProperties = { ...handleTileBorderStyle(row, col, levelInfo, isCliff) };

        return style;
    };

    const isAddCliff = (col: number, levelInfo: LevelInfo) => {
        if (col === levelInfo.tilesHeight - 1) return true;
        return false;
    };

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
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                position: "absolute",
                                top: gridSide * colIndex,
                                left: gridSide * rowIndex,
                                display: "flex",
                                flexDirection: "column",
                                zIndex: 0,
                                ...handleBackgroudTileStyle(
                                    rowIndex,
                                    colIndex,
                                    levelInfo,
                                    isAddCliff(colIndex, levelInfo) ? true : false
                                ),
                            }}
                        >
                            {/* Normal Background Tile */}
                            <Sprite
                                spriteSheetInfo={levelInfo.theme.backgroundSpriteSheetInfo}
                                imageOffset={levelInfo.theme.imageOffset}
                                scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
                            />
                            {/* Cliff */}
                            {isAddCliff(colIndex, levelInfo) && (
                                <Sprite
                                    spriteSheetInfo={levelInfo.theme.cliffSpriteSheetInfo}
                                    imageOffset={levelInfo.theme.cliffImageOffset}
                                    scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
                                />
                            )}
                        </div>
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
