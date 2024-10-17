"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import SignageImage from "@/game/assets/componentImage/signage.png";
import InteractionPrompt from "@/game/components/template/InteractionPrompt";
import { useAppDispatch } from "@/game/redux/hooks";
import { ModalWindowType, openModalWindow } from "@/game/redux/features/modalSlice";

interface SignageComponentProps {
    isUserNearSignage: boolean;
    signageType: string;
}
const SignageComponent: React.FC<SignageComponentProps> = (props) => {
    const { isUserNearSignage, signageType } = props;

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(openModalWindow(signageType as ModalWindowType));
    };

    return (
        <>
            {isUserNearSignage && <InteractionPrompt promptKey="k" onClickFunction={onClickHandler} />}
            <GridSizeImage src={SignageImage.src} />
        </>
    );
};

export default SignageComponent;
