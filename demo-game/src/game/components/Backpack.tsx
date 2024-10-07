import BackpackIcon from "@mui/icons-material/Backpack";
import { Box, styled } from "@mui/material";
import { CUSTOM_STYLE } from "../lib/conts";
import { useAppSelector } from "../redux/hooks";
import { CSSProperties, FC } from "react";
import ResumeBackpackComponent from "./placements/pickUp/resume/ResumeBackpackComponent";

const BackpackWrapper = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    color: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: "0 10px 0 10px",
    margin: "0 10px 0 10px",
    borderRadius: "5px",
    width: "200px",
});

const BackpackItemWrapper = styled(Box)({
    height: "100%",
});

const BackpackItemComponents: Record<string, FC<{ style: CSSProperties }>> = {
    resume: ResumeBackpackComponent,
    // Add more items here as needed
};

interface BackpackProps {}

export const Backpack = (props: BackpackProps) => {
    const backpackItems = useAppSelector((state) => state.backpack.backpackItems);

    return (
        <BackpackWrapper>
            <BackpackIcon />:
            {backpackItems.map((item) => {
                return (
                    <BackpackItemWrapper key={item}>
                        {(() => {
                            const ItemComponent = BackpackItemComponents[item];
                            if (!ItemComponent) {
                                throw new Error(`Unknown backpack item: ${item}`);
                            }
                            return (
                                <BackpackItemWrapper key={item}>
                                    <ItemComponent
                                        style={{
                                            height: "100%",
                                            width: "auto",
                                            aspectRatio: "1 / 1",
                                            cursor: "pointer",
                                        }}
                                    />
                                </BackpackItemWrapper>
                            );
                        })()}
                    </BackpackItemWrapper>
                );
            })}
        </BackpackWrapper>
    );
};
