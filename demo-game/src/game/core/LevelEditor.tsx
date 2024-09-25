import { Box, styled } from "@mui/material";
import { CUSTOM_STYLE } from "../lib/conts";
import { DefaultButton, DefaultInput, DefaultText, DefaultTitle, Panel } from "../components/styled";
import { useEffect, useState } from "react";
import { LevelInfo, setCurrentLevel, setLevelInfoByKey } from "game-engine/redux/modules/levelModule";
import { defaultLevelTheme } from "../lib/level";
import { useAppDispatch } from "../redux/hooks";
import React from "react";
import { PlacementSelector } from "../components/levelEditor/PlacementSelector";

const LevelEditorWrapper = styled(Panel)({
    right: 0,
    width: "300px",
    zIndex: 999,
});

const SectionWrapper = styled(Box)({
    margin: "5px",
    padding: "5px",
    paddingLeft: "10px",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_BACKGROUND_COLOR,
    borderRadius: "5px",
});

interface LevelEditorProps {}

export const LevelEditor = (props: LevelEditorProps) => {
    const editorLevelName = "editor-level";

    const dispatch = useAppDispatch();
    const [levelInfo, setLevelInfo] = useState<LevelInfo>({
        levelTitle: "default-game-level-title",
        theme: defaultLevelTheme,
        tilesWidth: 3,
        tilesHeight: 3,
        placements: [
            {
                id: "Character-main-character-0-0",
                coord: { x: 0, y: 0 },
                type: "Character",
                itemName: "main character",
            },
        ],
    });

    const downLoadLevelInfoHandler = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(levelInfo, null, 4));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${levelInfo.levelTitle}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const loadLevelInfoHandler = () => {
        dispatch(setLevelInfoByKey({ key: editorLevelName, levelInfo: levelInfo }));
    };

    const initLevelEditorHandler = async () => {
        dispatch(setLevelInfoByKey({ key: editorLevelName, levelInfo: levelInfo }));
        dispatch(setCurrentLevel(editorLevelName));
    };

    useEffect(() => {
        loadLevelInfoHandler();
    }, [levelInfo]);

    useEffect(() => {
        initLevelEditorHandler();
    }, []);

    return (
        <LevelEditorWrapper>
            <DefaultTitle>Level Title</DefaultTitle>
            <SectionWrapper>
                <DefaultInput
                    value={levelInfo.levelTitle}
                    onChange={(e) => {
                        setLevelInfo({ ...levelInfo, levelTitle: e.target.value });
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
                        setLevelInfo({ ...levelInfo, tilesWidth: Number(e.target.value) });
                    }}
                    value={levelInfo.tilesWidth}
                />
                <DefaultText>Height</DefaultText>
                <DefaultInput
                    type="number"
                    min="1"
                    max="20"
                    onChange={(e) => {
                        setLevelInfo({ ...levelInfo, tilesHeight: Number(e.target.value) });
                    }}
                    value={levelInfo.tilesHeight}
                />
            </SectionWrapper>
            <DefaultButton onClick={downLoadLevelInfoHandler}>Download Level Info</DefaultButton>
        </LevelEditorWrapper>
    );
};
