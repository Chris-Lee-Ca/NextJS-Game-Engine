import { useEffect, useRef, useState } from "react";
import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import SignageModalWindowBuilder from "./SignageModalWindowBuilder";
import { ModalContent, ModalTitle } from "@/game/components/styled";
import { Box, Button, Typography, styled } from "@mui/material";
import { useAppSelector } from "@/game/redux/hooks";
import { KEYBOARD_EVENT_PLUGIN_ID } from "game-engine/extensions/plugins/keyboardEventPlugin";

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

const NavRow = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: "16px",
});

const NavButton = styled(Button)({
    color: "#5a3e1b",
    fontWeight: "bold",
    textTransform: "none",
    minWidth: "64px",
});

const PageIndicator = styled(Typography)({
    fontSize: "12px",
    color: "#888",
});

const IntroModalModalContent: React.FC = () => {
    const [page, setPage] = useState(0);
    const heldKeys = useAppSelector((state) => state[KEYBOARD_EVENT_PLUGIN_ID].heldKeys);
    const prevKeys = useRef<string[]>([]);

    useEffect(() => {
        const justPressed = (key: string) => heldKeys.includes(key) && !prevKeys.current.includes(key);
        if (page === 0 && (justPressed("ArrowRight") || justPressed("d"))) {
            setPage(1);
        } else if (page === 1 && (justPressed("ArrowLeft") || justPressed("a"))) {
            setPage(0);
        }
        prevKeys.current = heldKeys;
    }, [heldKeys, page]);

    return (
        <>
            {/* Both pages occupy the same grid cell so the container always sizes to the taller page */}
            <Box sx={{ display: "grid", alignSelf: "stretch" }}>
                <Box
                    sx={{
                        gridArea: "1/1",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        visibility: page === 0 ? "visible" : "hidden",
                    }}
                >
                    <ModalTitle>About this World</ModalTitle>
                    <ModalContent>
                        This world is created by <span>TypeScript</span>, <span>Next JS</span> and <span>Material UI</span>.
                    </ModalContent>
                    <ModalContent>
                        Memories from <span>Sanity (headless CMS) </span>are scattered across the world.
                    </ModalContent>
                    <ModalContent>Try to capture them.</ModalContent>
                </Box>

                <Box
                    sx={{
                        gridArea: "1/1",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        visibility: page === 1 ? "visible" : "hidden",
                    }}
                >
                    <ModalTitle sx={{ borderBottom: "1px solid rgba(90,62,27,0.3)", paddingBottom: "6px", marginBottom: "10px", alignSelf: "stretch" }}>
                        Controls
                    </ModalTitle>
                    <ControlsGrid>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "2px" }}>
                                <Box /><KeyBadge>↑</KeyBadge><Box />
                                <KeyBadge>←</KeyBadge><KeyBadge>↓</KeyBadge><KeyBadge>→</KeyBadge>
                            </Box>
                            <Typography sx={{ fontSize: "11px", color: "#888" }}>or</Typography>
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
                </Box>
            </Box>

            <NavRow>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        backgroundColor: "rgba(44,62,80,0.08)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        visibility: page === 1 ? "visible" : "hidden",
                        pointerEvents: page === 1 ? "auto" : "none",
                    }}
                >
                    <KeyBadge>←</KeyBadge>
                    <Typography sx={{ fontSize: "11px", color: "#888" }}>/</Typography>
                    <KeyBadge>A</KeyBadge>
                    <NavButton onClick={() => setPage(0)}>Back</NavButton>
                </Box>
                <PageIndicator>{page + 1} / 2</PageIndicator>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        backgroundColor: "rgba(44,62,80,0.08)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        visibility: page === 0 ? "visible" : "hidden",
                        pointerEvents: page === 0 ? "auto" : "none",
                    }}
                >
                    <NavButton onClick={() => setPage(1)}>Next</NavButton>
                    <KeyBadge>D</KeyBadge>
                    <Typography sx={{ fontSize: "11px", color: "#888" }}>/</Typography>
                    <KeyBadge>→</KeyBadge>
                </Box>
            </NavRow>
        </>
    );
};

const IntroModalWindowComponent: ModalWindowConfig = new SignageModalWindowBuilder()
    .setContent(IntroModalModalContent)
    .build();

export default IntroModalWindowComponent;
