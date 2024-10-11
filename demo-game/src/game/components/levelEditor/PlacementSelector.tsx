import React, { useEffect, useState } from "react";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { CustomPlacementType } from "@/game/types/placement";
import { styled } from "@mui/material";
import { useAppDispatch } from "@/game/redux/hooks";
import { updateSelectedItem } from "@/game/redux/features/editModeSlice";
import PaginatedItemSelector from "./PaginatedItemSelector";

const TabSelector = styled("select")({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_BACKGROUND_COLOR,
    color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    width: "100%",
    border: "none",
    margin: "5px",
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

    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(updateSelectedItem(null));
        };
    }, [currentTab]);

    return (
        <>
            <TabSelector onChange={(e) => setCurrentTab(e.target.value as CustomPlacementType)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </TabSelector>
            <PaginatedItemSelector currentTab={currentTab} />
        </>
    );
};
