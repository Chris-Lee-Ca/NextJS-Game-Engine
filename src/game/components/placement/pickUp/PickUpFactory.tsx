"use client";

import { ReactNode } from "react";
import { Box, styled } from "@mui/material";

interface PickUpFactoryProps {
    itemName: string;
}

const TileBox = styled(Box)({
    zIndex: 1,
    // position: "absolute",
});

const SwitchHandler = (props: PickUpFactoryProps): ReactNode => {
    const { itemName } = props;
    return <div />;
};

const PickUpFactory = (props: PickUpFactoryProps): ReactNode => {
    const { itemName } = props;
    return <TileBox>{SwitchHandler({ itemName })}</TileBox>;
};

export default PickUpFactory;
