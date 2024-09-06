"use client";

import { Box, styled } from "@mui/material";
import Shrub from "./shrub";
import { ReactNode } from "react";

interface TileFactoryProps {
    itemName: string;
}

const TileBox = styled(Box)({
    zIndex: 1,
    // position: "absolute",
});

const SwitchHandler = (props: TileFactoryProps): ReactNode => {
    const { itemName } = props;
    if (itemName === "shrub") {
        return <Shrub />;
    }
};

const TileFactory = (props: TileFactoryProps) => {
    const { itemName } = props;
    return <TileBox>{SwitchHandler({ itemName })}</TileBox>;
};

export default TileFactory;
