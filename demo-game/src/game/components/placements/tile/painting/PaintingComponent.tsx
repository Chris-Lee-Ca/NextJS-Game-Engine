"use client";

import React from "react";
import InteractionPrompt from "@/game/components/template/InteractionPrompt";
import { useAppDispatch } from "@/game/redux/hooks";
import { ModalWindowType, openModalWindow } from "@/game/redux/features/modalSlice";
import { Box, Typography, styled } from "@mui/material";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import GridHelper from "game-engine/helper/GridHelper";
import Image from "game-engine/components/Image";
import { reduxStore } from "@/game/redux/store";
import { Project } from "@/game/types/gameStaticData";

const Wrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: `${GridHelper.getGridSizeInPixel()}px`,
    width: `${GridHelper.getGridSizeInPixel()}px`,
});

const ImageWrapper = styled(Box)({
    position: "absolute",
    border: `4px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    boxShadow: CUSTOM_STYLE.SHADOW.MAIN_BLACK_SHADOW,
    zIndex: 10,
});

const Title = styled(Typography)({
    position: "absolute",
    fontSize: "10px",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TRANSPARENT,
    fontWeight: "bold",
    textAlign: "center",
    top: `${GridHelper.getGridSizeInPixel() + 5}px`,
    zIndex: 10,
});

interface PaintingComponentProps {
    isUserNearPainting: boolean;
    paintingType: string;
}
const PaintingComponent: React.FC<PaintingComponentProps> = (props) => {
    const { isUserNearPainting, paintingType } = props;

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(openModalWindow(`${paintingType}` as ModalWindowType));
    };

    const data = reduxStore.getState().gameContent.data;
    const { allProject } = data!;

    const projectName = paintingType.split("-").slice(1).join("-");
    const project = allProject.find((project) => project.id === projectName) as Project;

    return (
        <>
            {isUserNearPainting && <InteractionPrompt promptKey="k" onClickFunction={onClickHandler} />}
            <Wrapper>
                <ImageWrapper>
                    <Image
                        src={project?.image.asset.url}
                        style={{
                            objectFit: "contain",
                            width: `${GridHelper.getGridSizeInPixel()}px`,
                            height: `${GridHelper.getGridSizeInPixel()}px`,
                        }}
                    />
                </ImageWrapper>
                <Title>{project?.title}</Title>
            </Wrapper>
        </>
    );
};

export default PaintingComponent;
