import { Box, styled } from "@mui/material";
import { CUSTOM_STYLE } from "../../lib/conts";
import { DefaultButton, DefaultInput, DefaultText, DefaultTitle, Panel } from "../../components/styled";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import React from "react";
import { PlacementSelector } from "../../components/levelEditor/PlacementSelector";
import { syncEditModeLevelInfo } from "../../redux/features/editModeSlice";
import { EditModeLevelInfo } from "../../types/general";
import { Coordinate } from "game-engine/types/general";
import ObjectPool from "game-engine/core/ObjectPool";

const LevelEditorWrapper = styled(Panel)({
    top: `${CUSTOM_STYLE.SIZE.STATUS_BAR_HEIGHT}px`,
    right: 0,
    width: "300px",
    zIndex: 999,
    borderRadius: "0px 0px 0px 10px",
});

const SectionWrapper = styled(Box)({
    margin: "5px",
    marginBottom: "15px",
    padding: "5px",
    paddingLeft: "10px",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_BACKGROUND_COLOR,
    borderRadius: "5px",
});

const ButtonGroup = styled(Box)({
    display: "flex",
    padding: "5px",
    justifyContent: "center",
    alignItems: "center",
});

interface LevelEditorProps {}

const LevelEditor = (_props: LevelEditorProps) => {
    const editModeLevelInfo = useAppSelector((state) => state.editMode.editModeLevelInfo);

    const dispatch = useAppDispatch();

    const setEditModeLevelInfo = (editModeLevelInfo: EditModeLevelInfo) => {
        dispatch(syncEditModeLevelInfo(editModeLevelInfo));
    };

    const handleMapDimensionChange = (dimensionToChange: "tilesWidth" | "tilesHeight", newDimensionSize: number) => {
        const currentDimensionSize = editModeLevelInfo[dimensionToChange];
        if (newDimensionSize > currentDimensionSize) {
            setEditModeLevelInfo({ ...editModeLevelInfo, [dimensionToChange]: Number(newDimensionSize) });
            return;
        }

        // Check the removed area of the map, if main character or main character preview object in that area, show error
        const isCoordInRemovedArea = (coord: Coordinate): boolean => {
            return (
                (dimensionToChange === "tilesWidth" && coord.x >= newDimensionSize) ||
                (dimensionToChange === "tilesHeight" && coord.y >= newDimensionSize)
            );
        };

        const getMainCharacterPlacement = () =>
            editModeLevelInfo.placements.find((p) => p.itemName === "main character" && p.type === "Character");

        const getMainCharacterPreviewObjectPlacement = () =>
            editModeLevelInfo.placements.find(
                (p) =>
                    p.itemName === "preview object" &&
                    "previewObjectItem" in p &&
                    p.previewObjectItem.type === "Character" &&
                    p.previewObjectItem.objectItemName === "main character"
            );

        const mainCharacterPlacement = getMainCharacterPlacement();
        if (mainCharacterPlacement) {
            const mainCharacterObject = ObjectPool.get(mainCharacterPlacement.id);
            if (mainCharacterObject && isCoordInRemovedArea(mainCharacterObject.coord)) {
                alert("Please move 'Main Character' out of the area that will be removed before resizing the map.");
                return;
            }
        }

        const mainCharacterPreviewObjectPlacement = getMainCharacterPreviewObjectPlacement();
        if (mainCharacterPreviewObjectPlacement && isCoordInRemovedArea(mainCharacterPreviewObjectPlacement.coord)) {
            alert(
                "Please move 'Main Character Preview Object' out of the area that will be removed before resizing the map."
            );
            return;
        }

        // Check the removed area of the map, if there are any items in that area, remove it
        const updatedPlacements = editModeLevelInfo.placements.filter(
            (placement) => !isCoordInRemovedArea(placement.coord)
        );
        setEditModeLevelInfo({
            ...editModeLevelInfo,
            [dimensionToChange]: Number(newDimensionSize),
            placements: updatedPlacements,
        });
    };

    const downLoadLevelInfoHandler = () => {
        const dataStr =
            "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editModeLevelInfo, null, 4));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${editModeLevelInfo.levelTitle}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <LevelEditorWrapper>
            <DefaultTitle>Level Title</DefaultTitle>
            <SectionWrapper>
                <DefaultInput
                    value={editModeLevelInfo.levelTitle}
                    onChange={(e) => {
                        setEditModeLevelInfo({ ...editModeLevelInfo, levelTitle: e.target.value });
                    }}
                />
            </SectionWrapper>
            <DefaultTitle>Object Category</DefaultTitle>
            <SectionWrapper>
                <PlacementSelector />
            </SectionWrapper>
            <DefaultTitle>Map Setting</DefaultTitle>
            <SectionWrapper>
                <DefaultText>Width</DefaultText>
                <DefaultInput
                    type="number"
                    min="1"
                    max="20"
                    onChange={(e) => {
                        handleMapDimensionChange("tilesWidth", Number(e.target.value));
                    }}
                    value={editModeLevelInfo.tilesWidth}
                />
                <DefaultText>Height</DefaultText>
                <DefaultInput
                    type="number"
                    min="1"
                    max="20"
                    onChange={(e) => {
                        handleMapDimensionChange("tilesHeight", Number(e.target.value));
                    }}
                    value={editModeLevelInfo.tilesHeight}
                />
            </SectionWrapper>
            <ButtonGroup>
                <DefaultButton style={{ width: "80" }} onClick={downLoadLevelInfoHandler}>
                    Download Level Info
                </DefaultButton>
            </ButtonGroup>
        </LevelEditorWrapper>
    );
};

export default LevelEditor;
