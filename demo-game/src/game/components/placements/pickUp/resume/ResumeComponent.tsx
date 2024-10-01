"use client";

import React from "react";
import Image from "game-engine/components/Image";
import paper from "@/game/assets/componentImage/paper.png";

interface ResumeComponentProps {}
const ResumeComponent: React.FC<ResumeComponentProps> = (_props) => {
    return <Image src={paper.src} />;
};

export default ResumeComponent;
