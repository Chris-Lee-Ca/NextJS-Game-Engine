import { CUSTOM_STYLE } from "@/game/lib/conts";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const RowContainer = styled(Box)({
    display: "flex",
    height: "33.3%",
    width: "100%",
});

const Road = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_ROAD,
    width: "100%",
    height: "100%",
});

const Barrier = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_ROAD_BACKGROUND,
    width: "100%",
    height: "100%",
});

const XJunctionRoadComponent: React.FC = () => {
    return (
        <>
            <RowContainer>
                <Barrier />
                <Road />
                <Barrier />
            </RowContainer>
            <RowContainer>
                <Road />
                <Road />
                <Road />
            </RowContainer>
            <RowContainer>
                <Barrier />
                <Road />
                <Barrier />
            </RowContainer>
        </>
    );
};

export default XJunctionRoadComponent;
