import { Box, styled } from "@mui/material";
import { CUSTOM_STYLE } from "../../lib/conts";
import { DefaultButton, DefaultInput, DefaultText, DefaultTitle, Panel } from "../../components/styled";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import React, { useEffect } from "react";
import { PlacementSelector } from "../../components/levelEditor/PlacementSelector";
import { Coordinate } from "game-engine/types/general";
import ObjectPool from "game-engine/core/ObjectPool";
import EditModeHelper from "@/game/helper/EditModeHelper";
import { PreviewObjectPlacement } from "@/game/types/placement";
import { selectCurrentLevelInfo, updateCurrentLevelInfo } from "game-engine/extensions/plugins/levelPlugin";
import { LevelInfo } from "game-engine/extensions/plugins/levelPlugin";
import { openAlert } from "@/game/redux/features/alertSlice";

const LevelEditorWrapper = styled(Panel)({
    top: `${CUSTOM_STYLE.SIZE.STATUS_BAR_HEIGHT}px`,
    right: 0,
    position: "absolute",
    maxHeight: `calc(100vha - ${CUSTOM_STYLE.SIZE.STATUS_BAR_HEIGHT}px)`,
    width: "300px",
    zIndex: 999,
    borderRadius: "0px 0px 0px 10px",
    overflow: "auto",
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
    const currentLevelInfo = useAppSelector(selectCurrentLevelInfo);

    const dispatch = useAppDispatch();

    const updateLevelInfo = (newLevelInfo: LevelInfo) => {
        dispatch(updateCurrentLevelInfo(newLevelInfo));
    };

    const handleMapDimensionChange = (dimensionToChange: "tilesWidth" | "tilesHeight", newDimensionSize: number) => {
        const currentDimensionSize = currentLevelInfo[dimensionToChange];
        if (newDimensionSize > currentDimensionSize) {
            updateLevelInfo({ ...currentLevelInfo, [dimensionToChange]: Number(newDimensionSize) });
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
            currentLevelInfo.placements.find((p) => p.itemName === "main character" && p.type === "Character");

        const getMainCharacterPreviewObjectPlacement = () =>
            currentLevelInfo.placements.find((placement) => {
                const p = placement as PreviewObjectPlacement;
                return (
                    p.itemName === "preview object" &&
                    "previewObjectItem" in p &&
                    p.previewObjectItem.type === "Character" &&
                    p.previewObjectItem.objectItemName === "main character"
                );
            });

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
        const updatedPlacements = currentLevelInfo.placements.filter(
            (placement) => !isCoordInRemovedArea(placement.coord)
        );
        updateLevelInfo({
            ...currentLevelInfo,
            [dimensionToChange]: Number(newDimensionSize),
            placements: updatedPlacements,
        });
    };

    const downLoadLevelInfoHandler = () => {
        // validate
        const placements = currentLevelInfo.placements as PreviewObjectPlacement[];
        const { isValid, errMessage } = EditModeHelper.placementsValidator(placements);
        if (!isValid) {
            window.alert(errMessage);
            return;
        }
        // convert
        const newPlacements = EditModeHelper.previewObjectPlacementListToPlacementList(placements);
        const newEditModeLevelInfo = { ...currentLevelInfo, placements: newPlacements };
        // download
        const dataStr =
            "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newEditModeLevelInfo, null, 4));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${currentLevelInfo.levelTitle}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    useEffect(() => {
        dispatch(
            openAlert({
                type: "warning",
                content: `The Level Editor is intended for development purposes, so the UI may not perform optimally on mobile devices.`,
                ttl: 10000,
            })
        );
    }, []);

    return (
        <LevelEditorWrapper>
            <DefaultTitle>Level Title</DefaultTitle>
            <SectionWrapper>
                {/* TODO: when change title, then change level, it break every thing. because everytime we change the title, we will create a new levelInfo */}
                <DefaultInput
                    value={currentLevelInfo.levelTitle}
                    disabled
                    onChange={(e) => {
                        updateLevelInfo({ ...currentLevelInfo, levelTitle: e.target.value });
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
                    value={currentLevelInfo.tilesWidth}
                />
                <DefaultText>Height</DefaultText>
                <DefaultInput
                    type="number"
                    min="1"
                    max="20"
                    onChange={(e) => {
                        handleMapDimensionChange("tilesHeight", Number(e.target.value));
                    }}
                    value={currentLevelInfo.tilesHeight}
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
