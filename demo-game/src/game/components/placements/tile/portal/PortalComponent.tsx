"use client";

import React from "react";
import GridSizeImage from "@/game/components/template/GridSizeImage";
import { PortalType } from "@/game/types/placement";
import { Box, Typography, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CUSTOM_STYLE } from "@/game/lib/conts";

interface PortalComponentProps {
    portalType: PortalType;
}

const portalTmage: Record<PortalType, string> = {
    prev: require("@/game/assets/componentImage/portal-prev.png").default.src,
    next: require("@/game/assets/componentImage/portal-next.png").default.src,
};

const Wrapper = styled(Box)({
    position: "relative",
});

const LabelBox = styled(Box)({
    position: "absolute",
    top: "-26px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
});

const Pill = styled(Box)({
    display: "inline-flex",
    alignItems: "center",
    gap: "3px",
    background: "rgba(0,0,0,0.62)",
    borderRadius: "12px",
    padding: "2px 8px",
    backdropFilter: "blur(4px)",
});

const PillLabel = styled(Typography)({
    color: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
});

const PortalComponent: React.FC<PortalComponentProps> = ({ portalType }) => {
    return (
        <Wrapper>
            <LabelBox>
                <Pill>
                    {portalType === "prev" && <ArrowBackIcon sx={{ fontSize: 13, color: "white" }} />}
                    <PillLabel>{portalType === "prev" ? "Prev" : "Next"}</PillLabel>
                    {portalType === "next" && <ArrowForwardIcon sx={{ fontSize: 13, color: "white" }} />}
                </Pill>
            </LabelBox>
            <GridSizeImage src={portalTmage[portalType]} />
        </Wrapper>
    );
};

export default PortalComponent;
