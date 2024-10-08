"use client";

import React from "react";
import GridSizeImage from "@/game/components/GridSizeImage";
import BalloonImage from "@/game/assets/componentImage/balloon.png";

interface FlowersComponentProps {}
const FlowersComponent: React.FC<FlowersComponentProps> = (_props) => {
    return <GridSizeImage src={BalloonImage.src} />;
};

export default FlowersComponent;
