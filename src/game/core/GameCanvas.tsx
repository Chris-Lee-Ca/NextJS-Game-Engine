"use client";

import Sprite from "@/game/components/Sprite/Sprite";
import { CUSTOM_STYLE, GRID, MAIN_CHARACTER_MOVING_SPEED, MAIN_SPRITE_SHEET } from "@/game/lib/conts";
import { demoLevel } from "@/game/lib/level";
import { useAppSelector } from "@/game/redux/hooks";
import { Level } from "@/game/types/general";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { CSSProperties, ReactNode } from "react";

type GameCanvasProps = { children?: ReactNode; level?: string };

const Canvas = styled(Box)({
    backgroundColor: "orange",
    height: "100vh",
    display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // position: "fixed",
});

// TODO Add Level Here
const GameCanvas = ({ children, level }: GameCanvasProps) => {
    const mainCharacterPosition = useAppSelector((state) => state.mainCharacter.mainCharacterPosition);

    const levelInformation = demoLevel;

    // A function for adding border for edge tile
    const handleEdgeTileStyle = (row: number, col: number, levelInformation: Level): CSSProperties => {
        let borderStyle: CSSProperties = {};
        const border = CUSTOM_STYLE.BORDER.MAP_BORDER;
        if (row === 0) borderStyle["borderLeft"] = border;
        if (col === 0) borderStyle["borderTop"] = border;
        if (row === levelInformation.tilesWidth - 1) borderStyle["borderRight"] = border;
        return borderStyle;
    };

    // A function for adding border for cliff tile
    const handleCliffStyle = (row: number, levelInformation: Level): CSSProperties => {
        let borderStyle: CSSProperties = {};
        const border = CUSTOM_STYLE.BORDER.MAP_BORDER;
        borderStyle["borderBottom"] = border;
        if (row === 0) borderStyle["borderLeft"] = border;
        if (row === levelInformation.tilesWidth - 1) borderStyle["borderRight"] = border;
        return borderStyle;
    };

    const handleBackgroudTileStyle = (
        row: number,
        col: number,
        levelInformation: Level,
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

    const isAddCliff = (col: number, levelInformation: Level) => {
        if (col === levelInformation.tilesHeight - 1) return true;
        return false;
    };

    return (
        <Canvas
            style={{
                transform: `translate(
                    ${-mainCharacterPosition.x * MAIN_CHARACTER_MOVING_SPEED}px, 
                    ${-mainCharacterPosition.y * MAIN_CHARACTER_MOVING_SPEED}px
                    )`,
                width: `${GRID.SIZE * levelInformation.tilesWidth * MAIN_SPRITE_SHEET.SCALE_FACTOR}px`,
                height: `${GRID.SIZE * levelInformation.tilesHeight * MAIN_SPRITE_SHEET.SCALE_FACTOR}px`,
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
                                top: `${GRID.SIZE * colIndex * MAIN_SPRITE_SHEET.SCALE_FACTOR}px`,
                                left: `${GRID.SIZE * rowIndex * MAIN_SPRITE_SHEET.SCALE_FACTOR}px`,
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
                                scaleFactor={MAIN_SPRITE_SHEET.SCALE_FACTOR}
                            />
                            {/* Cliff */}
                            {isAddCliff(colIndex, levelInformation) && (
                                <Sprite
                                    spriteSheetInfo={levelInformation.theme.cliffSpriteSheetInfo}
                                    imageOffset={levelInformation.theme.cliffImageOffset}
                                    scaleFactor={MAIN_SPRITE_SHEET.SCALE_FACTOR}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
            {levelInformation.placements
                .filter((placement) => !placement.hasBeenCollected)
                .map((placement) => {
                    return (
                        <div
                            key={placement.id}
                            style={{
                                position: "absolute",
                                transform: `translate(${placement.x}px, ${placement.y}px)`,
                                zIndex: placement.z,
                            }}
                        >
                            {placement.renderComponent()}
                        </div>
                    );
                })}
        </Canvas>
    );
};

export default GameCanvas;
