"use client";

import { ReactNode } from "react";
import Slime from "./slime";
import { Box, styled } from "@mui/material";

interface EnemyFactoryProps {
    itemName: string;
}

const TileBox = styled(Box)({
    zIndex: 1,
    // position: "absolute",
});

const SwitchHandler = (props: EnemyFactoryProps): ReactNode => {
    const { itemName } = props;
    if (itemName === "slime") {
        return <Slime />;
    }
};

const EnemyFactory = (props: EnemyFactoryProps): ReactNode => {
    const { itemName } = props;
    return <TileBox>{SwitchHandler({ itemName })}</TileBox>;
};

export default EnemyFactory;
