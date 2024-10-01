"use client";

import { Box, styled } from "@mui/material";
import GridHelper from "../helper/GridHelper";

const Container = styled(Box)({
    position: "relative",
    height: `${GridHelper.getGridSizeInPixel()}px`,
    width: `${GridHelper.getGridSizeInPixel()}px`,
});

const Img = styled("img")({
    width: `100%`,
    height: `100%`,
});

interface ImageProps {
    src: string;
}

const Image = (props: ImageProps) => {
    const { src } = props;

    return (
        <Container>
            <Img src={src} />
        </Container>
    );
};

export default Image;
