"use client";

import React from "react";
import MemoHelper from "game-engine/helper/MemoHelper";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import ShrubImage from "@/game/assets/componentImage/shrub.png";

const ShrubComponent: React.FC = () => {
    return <GridSizeImage src={ShrubImage.src} />;
};
export default MemoHelper.withValueEquality(ShrubComponent);
