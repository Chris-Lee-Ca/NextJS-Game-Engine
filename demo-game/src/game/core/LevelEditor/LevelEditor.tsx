import { Box, styled } from "@mui/material";
import { CUSTOM_STYLE, EDIT_MODE_LEVEL_NAME } from "../../lib/conts";
import { DefaultButton, DefaultInput, DefaultText, DefaultTitle, Panel } from "../../components/styled";
import { useEffect } from "react";
import { setCurrentLevel } from "game-engine/extensions/plugins/levelPlugin";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import React from "react";
import { PlacementSelector } from "../../components/levelEditor/PlacementSelector";
import { syncEditModeLevelInfo } from "../../redux/features/editModeSlice";
import { EditModeLevelInfo } from "../../types/general";
import EditModeHelper from "../../helper/EditModeHelper";

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

    const initLevelEditorHandler = async () => {
        const defaultEditModeLevelInfo = EditModeHelper.editModeLevelInfoInitializr();
        dispatch(syncEditModeLevelInfo(defaultEditModeLevelInfo));
        dispatch(setCurrentLevel(EDIT_MODE_LEVEL_NAME));
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

    useEffect(() => {
        initLevelEditorHandler();
    }, []);

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
                        setEditModeLevelInfo({ ...editModeLevelInfo, tilesWidth: Number(e.target.value) });
                    }}
                    value={editModeLevelInfo.tilesWidth}
                />
                <DefaultText>Height</DefaultText>
                <DefaultInput
                    type="number"
                    min="1"
                    max="20"
                    onChange={(e) => {
                        setEditModeLevelInfo({ ...editModeLevelInfo, tilesHeight: Number(e.target.value) });
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
