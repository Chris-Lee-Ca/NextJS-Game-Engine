import { CUSTOM_STYLE } from "@/game/lib/conts";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const Container = styled(Box)({
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
});

const RowContainer = styled(Box)({
    display: "flex",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
});

const Road = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_ROAD,
    width: "calc(100%/3)",
    height: "100%",
    boxSizing: "border-box",
});

const Barrier = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_ROAD_BACKGROUND,
    width: "calc(100%/3)",
    height: "100%",
});

const TurnRoadComponent: React.FC = () => {
    return (
        <>
            <Container>
                <RowContainer>
                    <Barrier />
                    <Road
                        sx={{ borderLeft: CUSTOM_STYLE.BORDER.MAP_BORDER, borderRight: CUSTOM_STYLE.BORDER.MAP_BORDER }}
                    />
                    <Barrier />
                </RowContainer>
                <RowContainer>
                    <Road
                        sx={{ borderTop: CUSTOM_STYLE.BORDER.MAP_BORDER, borderBottom: CUSTOM_STYLE.BORDER.MAP_BORDER }}
                    />
                    <Road
                        sx={{
                            borderBottom: CUSTOM_STYLE.BORDER.MAP_BORDER,
                            borderRight: CUSTOM_STYLE.BORDER.MAP_BORDER,
                        }}
                    />
                    <Barrier />
                </RowContainer>
                <RowContainer>
                    <Barrier />
                    <Barrier />
                    <Barrier />
                </RowContainer>
            </Container>
        </>
    );
};

export default TurnRoadComponent;
