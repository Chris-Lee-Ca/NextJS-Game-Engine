"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import SchoolImage from "@/game/assets/componentImage/school.png";
import InteractionPrompt from "@/game/components/template/InteractionPrompt";
import { useAppDispatch } from "@/game/redux/hooks";
import { ModalWindowType, openModalWindow } from "@/game/redux/features/modalSlice";

interface SchoolComponentProps {
    isUserNearSchool: boolean;
    schoolType: string;
}
const SchoolComponent: React.FC<SchoolComponentProps> = (props) => {
    const { isUserNearSchool, schoolType } = props;

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(openModalWindow(`school-${schoolType}` as ModalWindowType));
    };

    return (
        <>
            {isUserNearSchool && <InteractionPrompt promptKey="k" onClickFunction={onClickHandler} />}
            <GridSizeImage src={SchoolImage.src} />
        </>
    );
};

export default SchoolComponent;
