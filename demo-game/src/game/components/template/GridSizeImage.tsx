"use client";

import { Box, styled } from "@mui/material";
import GridHelper from "game-engine/helper/GridHelper";
import Image from "game-engine/components/Image";
import { CSSProperties } from "react";

const Container = styled(Box)({
    position: "relative",
    height: `${GridHelper.getGridSizeInPixel()}px`,
    width: `${GridHelper.getGridSizeInPixel()}px`,
});

interface GridSizeImageProps {
    src: string;
    alt?: string;
    style?: CSSProperties;
}

const GridSizeImage = (props: GridSizeImageProps) => {
    const { src, alt = "", style } = props;

    return (
        <Container style={{ ...style }}>
            <Image src={src} alt={alt} />
        </Container>
    );
};

export default GridSizeImage;
