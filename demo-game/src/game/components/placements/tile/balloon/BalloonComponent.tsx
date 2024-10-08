"use client";

import React from "react";
import GridSizeImage from "@/game/components/GridSizeImage";
import BalloonImage from "@/game/assets/componentImage/balloon.png";

interface BalloonComponentProps {}
const BalloonComponent: React.FC<BalloonComponentProps> = (_props) => {
    return <GridSizeImage src={BalloonImage.src} />;
};

export default BalloonComponent;
