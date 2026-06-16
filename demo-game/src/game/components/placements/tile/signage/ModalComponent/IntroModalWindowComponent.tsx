import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import SignageModalWindowBuilder from "./SignageModalWindowBuilder";
import { ModalContent, ModalTitle } from "@/game/components/styled";
import { Box, Typography, styled } from "@mui/material";

const ControlsHeader = styled(Typography)({
    fontWeight: "bold",
    fontSize: "14px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#5a3e1b",
    borderBottom: "1px solid rgba(90,62,27,0.3)",
    paddingBottom: "6px",
    marginTop: "18px",
    marginBottom: "10px",
    textAlign: "center",
    alignSelf: "stretch",
});

const ControlsGrid = styled(Box)({
    display: "grid",
    gridTemplateColumns: "auto auto",
    gap: "8px 20px",
    alignItems: "center",
});

const KeyGroup = styled(Box)({
    display: "flex",
    gap: "3px",
    justifyContent: "flex-end",
});

const KeyBadge = styled(Box)({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#2c3e50",
    color: "#f0f0f0",
    borderRadius: "5px",
    padding: "3px 7px",
    fontSize: "12px",
    fontWeight: "bold",
    fontFamily: "monospace",
    minWidth: "22px",
    boxShadow: "0 2px 0 #1a252f",
    border: "1px solid #4a5a6e",
    userSelect: "none",
});

const ActionLabel = styled(Typography)({
    color: "#3d2b0a",
    fontSize: "13px",
    fontWeight: "600",
});

const IntroModalModalContent: React.FC = () => {
    return (
        <>
            <ModalTitle>About this World</ModalTitle>
            <ModalContent>
                This world is created by <span>TypeScript</span>, <span>Next JS</span> and <span>Material UI</span>.
            </ModalContent>
            <ModalContent>
                Memories from <span>Sanity (headless CMS) </span>are scattered across the world.
            </ModalContent>
            <ModalContent>Try to capture them.</ModalContent>

            <ControlsHeader>Controls</ControlsHeader>
            <ControlsGrid>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
                    {/* Arrow keys in D-pad formation: ↑ on top, ← ↓ → below */}
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "2px" }}>
                        <Box /><KeyBadge>↑</KeyBadge><Box />
                        <KeyBadge>←</KeyBadge><KeyBadge>↓</KeyBadge><KeyBadge>→</KeyBadge>
                    </Box>
                    <Typography sx={{ fontSize: "11px", color: "#888" }}>or</Typography>
                    {/* WASD in D-pad formation: W on top, A S D below */}
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "2px" }}>
                        <Box /><KeyBadge>W</KeyBadge><Box />
                        <KeyBadge>A</KeyBadge><KeyBadge>S</KeyBadge><KeyBadge>D</KeyBadge>
                    </Box>
                </Box>
                <ActionLabel>Move</ActionLabel>

                <KeyGroup><KeyBadge>K</KeyBadge></KeyGroup>
                <ActionLabel>Interact</ActionLabel>

                <KeyGroup><KeyBadge>L</KeyBadge></KeyGroup>
                <ActionLabel>Close</ActionLabel>

                <KeyGroup>
                    <KeyBadge sx={{ opacity: 0.55 }}>→</KeyBadge>
                    <KeyBadge>→</KeyBadge>
                </KeyGroup>
                <ActionLabel>Run (double-tap)</ActionLabel>
            </ControlsGrid>
        </>
    );
};

const IntroModalWindowComponent: ModalWindowConfig = new SignageModalWindowBuilder()
    .setContent(IntroModalModalContent)
    .build();

export default IntroModalWindowComponent;
