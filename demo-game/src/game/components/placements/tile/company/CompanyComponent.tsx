"use client";

import React from "react";
import GridSizeImage from "@/game/components/GridSizeImage";
import CompanyImage from "@/game/assets/componentImage/company.png";
import InteractionPrompt from "@/game/components/template/InteractionPrompt";
import { useAppDispatch } from "@/game/redux/hooks";
import { ModalWindowType, openModalWindow } from "@/game/redux/features/modalSlice";

interface CompanyComponentProps {
    isUserNearCompany: boolean;
    companyType: string;
}
const CompanyComponent: React.FC<CompanyComponentProps> = (props) => {
    const { isUserNearCompany, companyType } = props;

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(openModalWindow(`company-${companyType}` as ModalWindowType));
    };

    return (
        <>
            {isUserNearCompany && <InteractionPrompt promptKey="k" onClickFunction={onClickHandler} />}
            <GridSizeImage src={CompanyImage.src} />
        </>
    );
};

export default CompanyComponent;
