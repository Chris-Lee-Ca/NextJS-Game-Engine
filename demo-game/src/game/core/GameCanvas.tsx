"use client";

import { useAppSelector } from "@/game/redux/hooks";
import { CanvasHelper, LevelInfo } from "game-engine/redux/modules/levelModule";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import GridHelper from "game-engine/helper/GridHelper";
import { selectCurrentLevelInfo } from "game-engine/redux/modules/levelModule";
import ObjectPool from "game-engine/core/ObjectPool";
import BackgroundTile from "../components/BackgroundTile";
import EditModeWrapper from "../components/EditModeWrapper";
import GameObject from "game-engine/components/GameObject";

type GameCanvasProps = {};

const Canvas = styled(Box)({});

const createBackgroundTile = (rowIndex: number, colIndex: number, gridSide: number, levelInfo: LevelInfo) => {
    return (
        <BackgroundTile
            key={`background-tile-${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
            gridSide={gridSide}
            theme={levelInfo.theme}
            tilesWidth={levelInfo.tilesWidth}
            tilesHeight={levelInfo.tilesHeight}
        />
    );
};

const createGameObject = (object: GameObject) => {
    return (
        <div
            key={`game-object-${object.id}`}
            style={{
                position: "absolute",
                transform: `translate(${object.position.x}px, ${object.position.y}px)`,
            }}
        >
            {object.render()}
        </div>
    );
};

const GameCanvas = (props: GameCanvasProps) => {
    useAppSelector((state) => state.core.time); //Subscribe "core time" to update the canvas every game loop
    const levelInfo = useAppSelector(selectCurrentLevelInfo);
    const editModeState = useAppSelector((state) => state.editMode);

    const gridSide = GridHelper.getGridSizeInPixel();

    const mainCharacterId = CanvasHelper.findMainCharacter(levelInfo).id;
    const mainCharacter = ObjectPool.get(mainCharacterId);
    const canvasBaseOffset = CanvasHelper.getCanvasBaseOffset();

    // Loading (it takes time for the object pool to create a new main character object when applying the level editor changes)
    if (typeof mainCharacter === "undefined") {
        return <div />;
    }
    return (
        <Canvas
            style={{
                transform: `translate(
                        ${-canvasBaseOffset.x - mainCharacter.position.x}px,
                        ${-canvasBaseOffset.y - mainCharacter.position.y}px
                        )`,
            }}
        >
            {/* Background */}
            {Array.from({ length: levelInfo.tilesWidth }).map((_, rowIndex) => (
                <div key={rowIndex} style={{ display: "flex" }}>
                    {Array.from({ length: levelInfo.tilesHeight }).map((_, colIndex) =>
                        !editModeState.editMode ? (
                            createBackgroundTile(rowIndex, colIndex, gridSide, levelInfo)
                        ) : (
                            // TODO, lazy load EditModeWrapper
                            <EditModeWrapper
                                key={`background-tile-wrapper-${rowIndex}-${colIndex}`}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                editModeSelectedItem={editModeState.selectedItem}
                            >
                                {createBackgroundTile(rowIndex, colIndex, gridSide, levelInfo)}
                            </EditModeWrapper>
                        )
                    )}
                </div>
            ))}
            {/* Game Object */}
            {levelInfo.placements.map((placement, index) => {
                const object = ObjectPool.get(placement.id);
                if (typeof object === "undefined") return <div key={index} />;
                return !editModeState.editMode ? (
                    createGameObject(object)
                ) : (
                    // TODO, lazy load EditModeWrapper
                    <EditModeWrapper
                        key={`game-object-wrapper-${object.id}-${index}`}
                        rowIndex={object.coord.x}
                        colIndex={object.coord.y}
                        editModeSelectedItem={editModeState.selectedItem}
                    >
                        {createGameObject(object)}
                    </EditModeWrapper>
                );
            })}
        </Canvas>
    );
};

export default GameCanvas;
