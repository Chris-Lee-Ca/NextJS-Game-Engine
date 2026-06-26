"use client";

import { styled } from "@mui/material";
import { CSSProperties } from "react";

const Img = styled("img")({
    width: `100%`,
    height: `100%`,
});

interface ImageProps {
    src: string;
    alt: string;
    style?: CSSProperties;
}

const Image = (props: ImageProps) => {
    const { src, alt, style } = props;

    return <Img src={src} alt={alt} style={{ ...style }} />;
};

export default Image;
