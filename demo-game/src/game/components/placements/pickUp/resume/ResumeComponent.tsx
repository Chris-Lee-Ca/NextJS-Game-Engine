"use client";

import React from "react";
import MemoHelper from "game-engine/helper/MemoHelper";
import paper from "@/game/assets/componentImage/paper.png";
import GridSizeImage from "@/game/components/template/GridSizeImage";

const ResumeComponent: React.FC = () => {
    return <GridSizeImage src={paper.src} />;
};

export default MemoHelper.withValueEquality(ResumeComponent);
