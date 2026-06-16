"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import BalloonImage from "@/game/assets/componentImage/balloon.png";

const BalloonComponent: React.FC = () => {
    return <GridSizeImage src={BalloonImage.src} />;
};

export default BalloonComponent;
