"use client";

import React from "react";
import GridSizeImage from "@/game/components/GridSizeImage";
import SignageImage from "@/game/assets/componentImage/signage.png"
import InteractionPrompt from "@/game/components/template/InteractionPrompt";
import { useAppDispatch } from "@/game/redux/hooks";
import { openModalWindow } from "@/game/redux/features/modalSlice";

interface SignageComponentProps {
    isUserNearSignage: boolean
}
const SignageComponent: React.FC<SignageComponentProps> = (props) => {
    const {isUserNearSignage} = props;

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(openModalWindow("intro"));
    }

    return (
    <>
        {isUserNearSignage && 
        <InteractionPrompt 
            promptKey="k" 
            onClickFunction={onClickHandler}
        />}
        <GridSizeImage src={SignageImage.src} />
    </>);
};

export default SignageComponent;
