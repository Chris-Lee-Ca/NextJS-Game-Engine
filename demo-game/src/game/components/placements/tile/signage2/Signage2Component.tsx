"use client";

import React from "react";
import GridSizeImage from "@/game/components/GridSizeImage";
import Signage2Image from "@/game/assets/componentImage/signage2.png"
import InteractionPrompt from "@/game/components/template/InteractionPrompt";
import { useAppDispatch } from "@/game/redux/hooks";
import { ModalWindowType, openModalWindow } from "@/game/redux/features/modalSlice";
import { styled, Typography } from "@mui/material";
import { CUSTOM_STYLE } from "@/game/lib/conts";

const Title = styled(Typography)({
    position: 'absolute',
    top: '-5px',
    fontSize: '10px',
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TRANSPARENT,
    fontWeight: 'bold',
    padding: '2px'
})

interface Signage2ComponentProps {
    isUserNearSignage2: boolean,
    signageType: string
}

const Signage2Component: React.FC<Signage2ComponentProps> = (props) => {
    const {isUserNearSignage2, signageType} = props;

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(openModalWindow(signageType as ModalWindowType));
    }

    const field = signageType.split('-')[1].toUpperCase();    

    return (
    <>
        {isUserNearSignage2 && 
        <InteractionPrompt 
            promptKey="k" 
            onClickFunction={onClickHandler}
        />}
        <Title>{field}</Title>
        <GridSizeImage src={Signage2Image.src} />
    </>);
};

export default Signage2Component;
