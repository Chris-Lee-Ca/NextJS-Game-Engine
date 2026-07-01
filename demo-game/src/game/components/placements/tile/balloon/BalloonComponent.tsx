"use client";

import React from "react";
import MemoHelper from "game-engine/helper/MemoHelper";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import BalloonImage from "@/game/assets/componentImage/balloon.png";

const BalloonComponent: React.FC = () => {
    return <GridSizeImage src={BalloonImage.src} />;
};

export default MemoHelper.withValueEquality(BalloonComponent);
