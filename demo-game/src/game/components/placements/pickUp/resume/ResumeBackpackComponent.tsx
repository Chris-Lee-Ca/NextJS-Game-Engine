"use client";

import React, { CSSProperties } from "react";
import Image from "game-engine/components/Image";
import paper from "@/game/assets/componentImage/paper.png";
import { Bio } from "@/game/lib/gameContent";

interface ResumeBackpackComponentProps {
    style: CSSProperties;
}
const ResumeBackpackComponent: React.FC<ResumeBackpackComponentProps> = (props) => {
    const { style } = props;

    const handleOnClickReadIt = () => {
        window.open(Bio.resume, "_blank");
    };

    return (
        <div onClick={handleOnClickReadIt} style={{ ...style }}>
            <Image src={paper.src} />
        </div>
    );
};

export default ResumeBackpackComponent;
