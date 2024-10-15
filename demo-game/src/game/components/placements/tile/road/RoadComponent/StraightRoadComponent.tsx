import { CUSTOM_STYLE } from "@/game/lib/conts";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const RowContainer = styled(Box)({
    display: "flex",
    height: "100%",
    width: "100%",
});

const Road = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_ROAD,
    width: "calc(100%/3)",
    height: "100%",
    borderLeft: CUSTOM_STYLE.BORDER.MAP_BORDER,
    borderRight: CUSTOM_STYLE.BORDER.MAP_BORDER,
    boxSizing: "border-box",
});

const Barrier = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_ROAD_BACKGROUND,
    width: "calc(100%/3)",
    height: "100%",
});

const StraightRoadComponent: React.FC = () => {
    return (
        <>
            <RowContainer>
                <Barrier />
                <Road />
                <Barrier />
            </RowContainer>
        </>
    );
};

export default StraightRoadComponent;
