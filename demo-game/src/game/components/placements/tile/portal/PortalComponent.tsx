"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import { PortalType } from "@/game/types/placement";

interface PortalComponentProps {
    portalType: PortalType;
}

const portalTmage: Record<PortalType, string> = {
    prev: require("@/game/assets/componentImage/portal-prev.png").default.src,
    next: require("@/game/assets/componentImage/portal-next.png").default.src,
};

const PortalComponent: React.FC<PortalComponentProps> = (props) => {
    const { portalType } = props;

    return <GridSizeImage src={portalTmage[portalType]} />;
};

export default PortalComponent;
