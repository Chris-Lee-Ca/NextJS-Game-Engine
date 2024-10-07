"use client";

import { styled } from "@mui/material";

const Img = styled("img")({
    width: `100%`,
    height: `100%`,
});

interface ImageProps {
    src: string;
}

const Image = (props: ImageProps) => {
    const { src } = props;

    return <Img src={src} />;
};

export default Image;
