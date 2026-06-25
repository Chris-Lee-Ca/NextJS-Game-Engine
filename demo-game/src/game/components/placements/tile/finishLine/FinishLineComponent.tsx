"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import FinishLineImage from "@/game/assets/componentImage/finishLine.png";

const FinishLineComponent: React.FC = () => {
    return <GridSizeImage src={FinishLineImage.src} />;
};

export default React.memo(FinishLineComponent);
