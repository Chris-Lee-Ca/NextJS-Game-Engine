"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import FinishLineImage from "@/game/assets/componentImage/finishLine.png";

interface FinishLineComponentProps {}
const FinishLineComponent: React.FC<FinishLineComponentProps> = (_props) => {
    return <GridSizeImage src={FinishLineImage.src} />;
};

export default FinishLineComponent;
