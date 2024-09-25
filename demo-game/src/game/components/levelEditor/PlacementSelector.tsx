import React, { useState } from "react";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { CustomPlacementType } from "@/game/types/general";
import { Divider, styled } from "@mui/material";
import { Box } from "@mui/system";
import GridHelper from "game-engine/helper/GridHelper";

interface PlacementSelectorProps {}

type Item = { itemName: string; avatar: any };

const TabSelector = styled("select")({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_BACKGROUND_COLOR,
    color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
    width: "100%",
    border: "none",
    margin: "5px",
});

const ItemSelector = styled(Box)({
    display: "flex",
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
});

const options: { label: string; value: CustomPlacementType }[] = [
    {
        label: "Character",
        value: "character",
    },
    {
        label: "Enemy",
        value: "enemy",
    },
    {
        label: "Pick Up",
        value: "pickUp",
    },
    {
        label: "Tile",
        value: "tile",
    },
];

const items: { [key in CustomPlacementType]: Item[] } = {
    character: [
        {
            itemName: "main character",
            avatar: "yoyo",
        },
    ],
    enemy: [],
    pickUp: [],
    tile: [],
};

export const PlacementSelector = (props: PlacementSelectorProps) => {
    const [currentTab, setCurrentTab] = useState<CustomPlacementType>("character");
    const [selectedItem, setSelectedItem] = useState<Item>();

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
                {items[currentTab].map((item) => (
                    <ItemBox
                        key={item.itemName}
                        style={{ border: selectedItem === item ? `2px solid ${CUSTOM_STYLE.COLOR.MAIN_BLUE}` : "" }}
                        onClick={() => setSelectedItem(item)}
                    >
                        {item.itemName}
                    </ItemBox>
                ))}
            </ItemSelector>
        </>
    );
};
