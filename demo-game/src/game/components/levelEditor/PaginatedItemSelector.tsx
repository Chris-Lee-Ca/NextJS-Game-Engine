import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import GridHelper from "game-engine/helper/GridHelper";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { handleDisplayAvatar, previewObjectList } from "@/game/lib/previewObjectList";
import { CustomPlacementType } from "@/game/types/placement";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { updateSelectedItem } from "@/game/redux/features/editModeSlice";
import { DefaultButton } from "../styled";

const ITEMS_PER_PAGE = 12; // Max items per page

const ItemsBackground = styled(Box)({
    height: `${(GridHelper.getGridSizeInPixel() * ITEMS_PER_PAGE) / 3 + 50}px`,
    maxWidth: "100%",
});

const ItemSelector = styled(Box)({
    display: "flex",
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

const ButtonGroup = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    color: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
});

interface PaginatedItemSelectorProps {
    currentTab: CustomPlacementType;
}

const PaginatedItemSelector = (props: PaginatedItemSelectorProps) => {
    const editModeState = useAppSelector((state) => state.editMode);
    const dispatch = useAppDispatch();

    const { currentTab } = props;
    const totalPages = Math.ceil(previewObjectList[currentTab].length / ITEMS_PER_PAGE);

    // State for current page
    const [currentPage, setCurrentPage] = useState(0);

    // Get items for current page
    const itemsToShow = previewObjectList[currentTab].slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    // Handle next/previous page
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        setCurrentPage(0);
    }, [currentTab]);

    return (
        <Box>
            <ItemsBackground>
                <ItemSelector>
                    {itemsToShow.map((item) => (
                        <ItemBox
                            key={item.id}
                            style={{
                                border:
                                    editModeState.selectedItem === item
                                        ? `2px solid ${CUSTOM_STYLE.COLOR.MAIN_BLUE}`
                                        : "",
                            }}
                            onClick={() => {
                                // remove selected item if clicking the same item again
                                const selectedItem = editModeState.selectedItem !== item ? item : null;
                                dispatch(updateSelectedItem(selectedItem));
                            }}
                        >
                            {handleDisplayAvatar(item)}
                        </ItemBox>
                    ))}
                </ItemSelector>
            </ItemsBackground>

            {/* Pagination Controls */}
            <ButtonGroup>
                <DefaultButton onClick={handlePrevPage} disabled={currentPage === 0}>
                    &lt;
                </DefaultButton>
                <span>
                    {totalPages !== 0 ? currentPage + 1 : 0} / {totalPages}
                </span>
                <DefaultButton onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                    &gt;
                </DefaultButton>
            </ButtonGroup>
        </Box>
    );
};

export default PaginatedItemSelector;
