"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import ShrubImage from "@/game/assets/componentImage/shrub.png";

interface ShrubComponentProps {}

const ShrubComponent: React.FC<ShrubComponentProps> = (props) => {
    return <GridSizeImage src={ShrubImage.src} />;
};
export default ShrubComponent;
