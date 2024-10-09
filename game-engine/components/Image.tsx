"use client";

import { styled } from "@mui/material";
import { CSSProperties } from "react";

const Img = styled("img")({
    width: `100%`,
    height: `100%`,
});

interface ImageProps {
    src: string;
    style?: CSSProperties;
}

const Image = (props: ImageProps) => {
    const { src, style } = props;

    return <Img src={src} style={{ ...style }} />;
};

export default Image;
