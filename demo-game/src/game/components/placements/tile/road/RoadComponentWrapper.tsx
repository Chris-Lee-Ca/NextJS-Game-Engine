import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Facing } from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import GridHelper from "game-engine/helper/GridHelper";
import { ReactNode } from "react";

const Container = styled(Box)({
    position: "absolute",
    height: `${GridHelper.getGridSizeInPixel()}px`,
    width: `${GridHelper.getGridSizeInPixel()}px`,
});

const getTransformDegreee = (facing: Facing) => {
    switch (facing) {
        case "up":
            return "rotate(0deg)";
        case "right":
            return "rotate(90deg)";
        case "down":
            return "rotate(180deg)";
        case "left":
            return "rotate(270deg)";
        default:
            return "rotate(0deg)";
    }
};

interface RoadComponentWrapperProps {
    facing: Facing;
    roadInterface: ReactNode;
}

const RoadComponentWrapper = (props: RoadComponentWrapperProps) => {
    const { facing, roadInterface } = props;

    return (
        <>
            <Container sx={{ transform: getTransformDegreee(facing) }}>{roadInterface}</Container>
        </>
    );
};

export default RoadComponentWrapper;
