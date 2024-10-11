"use client";

import React from "react";
import GridSizeImage from "@/game/components/GridSizeImage";
import InteractionPrompt from "@/game/components/template/InteractionPrompt";
import { useAppDispatch } from "@/game/redux/hooks";
import { ModalWindowType, openModalWindow } from "@/game/redux/features/modalSlice";
import { Typography, styled } from "@mui/material";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { Projects } from "@/game/lib/gameContent";

const Title = styled(Typography)({
    position: "absolute",
    top: "-5px",
    fontSize: "10px",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TRANSPARENT,
    fontWeight: "bold",
    padding: "2px",
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

    const projectName = paintingType.split("-")[1].toUpperCase();
    const projectImage = Projects.find((project) => project.nickname === projectName)?.image;

    return (
        <>
            {isUserNearPainting && <InteractionPrompt promptKey="k" onClickFunction={onClickHandler} />}
            <Title>{projectName}</Title>
            <GridSizeImage src={projectImage} />
        </>
    );
};

export default PaintingComponent;
