"use client";

import Sprite from "@/game/core/components/Sprite/Sprite";
import { CUSTOM_STYLE, MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import { useAppSelector } from "@/game/redux/hooks";
import { LevelInfo } from "@/game/types/general";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { CSSProperties } from "react";
import GridHelper from "../lib/helper/GridHelper";
import SpriteHelper from "../lib/helper/SpriteHelper";
import CanvasHelper from "../lib/helper/CanvasHelper";
import { selectCurrentLevelInfo } from "../redux/features/gameSlice";
import objectPool from "./ObjectPool";

type GameCanvasProps = {};

const Canvas = styled(Box)({
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // position: "fixed",
});

const GameCanvas = (props: GameCanvasProps) => {
    const mainCharacterPixelPosition = useAppSelector((state) => state.mainCharacter.mainCharacterPixelPosition);
    const levelInfo = useAppSelector(selectCurrentLevelInfo);

    // A function for adding border for edge tile
    const handleEdgeTileStyle = (row: number, col: number, levelInfo: LevelInfo): CSSProperties => {
        let borderStyle: CSSProperties = {};
        const mapBorder = CUSTOM_STYLE.BORDER.MAP_BORDER;
        const gridBorder = CUSTOM_STYLE.BORDER.GRID_BORDER;
        borderStyle["border"] = gridBorder;
        if (row === 0) borderStyle["borderLeft"] = mapBorder;
        if (col === 0) borderStyle["borderTop"] = mapBorder;
        if (row === levelInfo.tilesWidth - 1) borderStyle["borderRight"] = mapBorder;

        return borderStyle;
    };

    // A function for adding border for cliff tile
    const handleCliffStyle = (row: number, levelInfo: LevelInfo): CSSProperties => {
        let borderStyle: CSSProperties = {};
        const mapBorder = CUSTOM_STYLE.BORDER.MAP_BORDER;
        const gridBorder = CUSTOM_STYLE.BORDER.GRID_BORDER;
        borderStyle["border"] = gridBorder;
        borderStyle["borderBottom"] = mapBorder;
        if (row === 0) borderStyle["borderLeft"] = mapBorder;
        if (row === levelInfo.tilesWidth - 1) borderStyle["borderRight"] = mapBorder;

        return borderStyle;
    };

    const handleBackgroudTileStyle = (
        row: number,
        col: number,
        levelInfo: LevelInfo,
        isCliff: boolean
    ): CSSProperties => {
        let style: CSSProperties = { ...handleEdgeTileStyle(row, col, levelInfo) };
        if (isCliff) {
            style = {
                ...handleCliffStyle(row, levelInfo),
                ...style,
            };
        }
        return style;
    };

    const isAddCliff = (col: number, levelInfo: LevelInfo) => {
        if (col === levelInfo.tilesHeight - 1) return true;
        return false;
    };

    const canvasDefaultOffset = CanvasHelper.getCanvasDefaultOffset(levelInfo);

    return (
        <Canvas
            style={{
                transform: `translate(
                        ${-canvasDefaultOffset.x - mainCharacterPixelPosition.x}px,
                        ${-canvasDefaultOffset.y - mainCharacterPixelPosition.y}px
                        )`,
            }}
        >
            {Array.from({ length: levelInfo.tilesWidth }).map((_, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {Array.from({ length: levelInfo.tilesHeight }).map((_, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                position: "absolute",
                                top: GridHelper.getActualPixel(colIndex),
                                left: GridHelper.getActualPixel(rowIndex),
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
            {levelInfo.placements
                .filter((placement) => !placement.hasBeenCollected)
                .map((placement, index) => {
                    const object = objectPool.get(placement.id);
                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                transform: `translate(
                                    ${GridHelper.getActualPixel(placement.position.x)},
                                    ${GridHelper.getActualPixel(placement.position.y)}
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
