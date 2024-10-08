import React, { useEffect, useState } from "react";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { CustomPlacementType } from "@/game/types/general";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import GridHelper from "game-engine/helper/GridHelper";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { updateSelectedItem } from "@/game/redux/features/editModeSlice";
import { previewObjectList } from "@/game/lib/previewObjectList";

const TabSelector = styled("select")({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_BACKGROUND_COLOR,
    color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    width: "100%",
    border: "none",
    margin: "5px",
});

const ItemSelector = styled(Box)({
    display: "flex",
    maxWidth: "100%",
    flexWrap: "wrap",
});

const ItemBox = styled(Box)({
    width: GridHelper.getGridSizeInPixel(),
    height: GridHelper.getGridSizeInPixel(),
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    borderRadius: "5px",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",
    ffontSize: "calc(4vw + 4vh + 2vmin)",
});

const options: { label: string; value: CustomPlacementType }[] = [
    {
        label: "Character",
        value: "Character",
    },
    {
        label: "Enemy",
        value: "Enemy",
    },
    {
        label: "Pick Up",
        value: "PickUp",
    },
    {
        label: "Tile",
        value: "Tile",
    },
];

interface PlacementSelectorProps {}

export const PlacementSelector = (props: PlacementSelectorProps) => {
    const [currentTab, setCurrentTab] = useState<CustomPlacementType>("Character");

    const editModeState = useAppSelector((state) => state.editMode);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(updateSelectedItem(null));
        };
    }, []);

    return (
        <>
            <TabSelector onChange={(e) => setCurrentTab(e.target.value as CustomPlacementType)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </TabSelector>
            {/* TODO: show avatar for item instead of item name */}
            <ItemSelector>
                {previewObjectList[currentTab].map((item) => (
                    <ItemBox
                        key={item.id}
                        style={{
                            border:
                                editModeState.selectedItem === item ? `2px solid ${CUSTOM_STYLE.COLOR.MAIN_BLUE}` : "",
                        }}
                        onClick={() => {
                            // remove selected item if clicking the same item again
                            const selectedItem = editModeState.selectedItem !== item ? item : null;
                            dispatch(updateSelectedItem(selectedItem));
                        }}
                    >
                        {item.id.replaceAll("-", " ")}
                    </ItemBox>
                ))}
            </ItemSelector>
        </>
    );
};
