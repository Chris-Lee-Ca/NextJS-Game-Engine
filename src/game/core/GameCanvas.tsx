"use client";

import Sprite from "@/game/components/Sprite/Sprite";
import { CUSTOM_STYLE, MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import { useAppSelector } from "@/game/redux/hooks";
import { LevelInfo } from "@/game/types/general";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { CSSProperties, ReactNode } from "react";
import PlacementFactory from "../components/placement/PlacementFactory";
import GridHelper from "../lib/helper/GridHelper";
import SpriteHelper from "../lib/helper/SpriteHelper";
import CharacterMovementHelper from "../lib/helper/CharacterMovementHelper";
import { selectCurrentLevelInfo } from "../redux/features/gameSlice";

type GameCanvasProps = { children?: ReactNode; level?: string };

const Canvas = styled(Box)({
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // position: "fixed",
});

const GameCanvas = ({ children, level }: GameCanvasProps) => {
    const mainCharacterPixelPosition = useAppSelector((state) => state.mainCharacter.mainCharacterPixelPosition);
    const levelInformation = useAppSelector(selectCurrentLevelInfo);

    // A function for adding border for edge tile
    const handleEdgeTileStyle = (row: number, col: number, levelInformation: LevelInfo): CSSProperties => {
        let borderStyle: CSSProperties = {};
        const mapBorder = CUSTOM_STYLE.BORDER.MAP_BORDER;
        const gridBorder = CUSTOM_STYLE.BORDER.GRID_BORDER;
        borderStyle["border"] = gridBorder;
        if (row === 0) borderStyle["borderLeft"] = mapBorder;
        if (col === 0) borderStyle["borderTop"] = mapBorder;
        if (row === levelInformation.tilesWidth - 1) borderStyle["borderRight"] = mapBorder;

        return borderStyle;
    };

    // A function for adding border for cliff tile
    const handleCliffStyle = (row: number, levelInformation: LevelInfo): CSSProperties => {
        let borderStyle: CSSProperties = {};
        const mapBorder = CUSTOM_STYLE.BORDER.MAP_BORDER;
        const gridBorder = CUSTOM_STYLE.BORDER.GRID_BORDER;
        borderStyle["border"] = gridBorder;
        borderStyle["borderBottom"] = mapBorder;
        if (row === 0) borderStyle["borderLeft"] = mapBorder;
        if (row === levelInformation.tilesWidth - 1) borderStyle["borderRight"] = mapBorder;

        return borderStyle;
    };

    const handleBackgroudTileStyle = (
        row: number,
        col: number,
        levelInformation: LevelInfo,
        isCliff: boolean
    ): CSSProperties => {
        let style: CSSProperties = { ...handleEdgeTileStyle(row, col, levelInformation) };
        if (isCliff) {
            style = {
                ...handleCliffStyle(row, levelInformation),
                ...style,
            };
        }
        return style;
    };

    const isAddCliff = (col: number, levelInformation: LevelInfo) => {
        if (col === levelInformation.tilesHeight - 1) return true;
        return false;
    };

    const canvasDefaultOffset = CharacterMovementHelper.getCanvasDefaultOffset(levelInformation);

    return (
        <Canvas
            style={{
                transform: `translate(
                        ${-canvasDefaultOffset.x - mainCharacterPixelPosition.x}px,
                        ${-canvasDefaultOffset.y - mainCharacterPixelPosition.y}px
                        )`,
            }}
        >
            {children}
            {Array.from({ length: levelInformation.tilesWidth }).map((_, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {Array.from({ length: levelInformation.tilesHeight }).map((_, colIndex) => (
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
                                    levelInformation,
                                    isAddCliff(colIndex, levelInformation) ? true : false
                                ),
                            }}
                        >
                            {/* Normal Background Tile */}
                            <Sprite
                                spriteSheetInfo={levelInformation.theme.backgroundSpriteSheetInfo}
                                imageOffset={levelInformation.theme.imageOffset}
                                scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
                            />
                            {/* Cliff */}
                            {isAddCliff(colIndex, levelInformation) && (
                                <Sprite
                                    spriteSheetInfo={levelInformation.theme.cliffSpriteSheetInfo}
                                    imageOffset={levelInformation.theme.cliffImageOffset}
                                    scaleFactor={SpriteHelper.getSpriteSheetScaleFactor(MAIN_SPRITE_SHEET)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
            {levelInformation.placements
                .filter((placement) => !placement.hasBeenCollected)
                .map((placement, index) => {
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
                            <PlacementFactory placement={placement} />
                        </div>
                    );
                })}
        </Canvas>
    );
};

export default GameCanvas;
