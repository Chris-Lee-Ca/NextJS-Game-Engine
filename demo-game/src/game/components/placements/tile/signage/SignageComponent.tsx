"use client";

import React from "react";
import GridSizeImage from "@/game/components/GridSizeImage";
import SignageImage from "@/game/assets/componentImage/signage.png"

interface SignageComponentProps {}
const SignageComponent: React.FC<SignageComponentProps> = (_props) => {
    return <GridSizeImage src={SignageImage.src} />;
};

export default SignageComponent;
