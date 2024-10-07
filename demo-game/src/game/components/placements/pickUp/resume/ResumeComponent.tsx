"use client";

import React from "react";
import paper from "@/game/assets/componentImage/paper.png";
import GridSizeImage from "@/game/components/GridSizeImage";

interface ResumeComponentProps {}
const ResumeComponent: React.FC<ResumeComponentProps> = (_props) => {
    return <GridSizeImage src={paper.src} />;
};

export default ResumeComponent;
