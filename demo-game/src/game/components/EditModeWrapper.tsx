import { PreviewObjectItem } from "../types/general";
import { PreviewObjectPlacement } from "../types/placement";
import { Box, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";
import EditModeHelper from "../helper/EditModeHelper";
import { selectCurrentLevelInfo, updateCurrentLevelInfo } from "game-engine/extensions/plugins/levelPlugin";

const EditModeBackgroundTileWrapper = styled(Box)({});

interface EditModeBackgroundTileProps {
    children: ReactNode;
    rowIndex: number;
    colIndex: number;
    editModeSelectedItem: PreviewObjectItem | null;
}

// A Wrapper component to wrap game object / game tile to provide edit mode functionality
const EditModeWrapper = (props: EditModeBackgroundTileProps) => {
    const { children, rowIndex, colIndex, editModeSelectedItem } = props;

    const currentLevelInfo = useAppSelector(selectCurrentLevelInfo);
    const dispatch = useAppDispatch();

    // add preview object
    const leftClickHandler = (rowIndex: number, colIndex: number) => {
        if (editModeSelectedItem === null) return;
        const previewObjectPlacement: PreviewObjectPlacement = {
            id: `Tile-preview-object-${editModeSelectedItem.objectItemName}-${rowIndex}-${colIndex}`,
            coord: { x: rowIndex, y: colIndex },
            type: "Tile",
            itemName: "preview object",
            previewObjectItem: editModeSelectedItem,
        };
        const oldLevelInfo = currentLevelInfo;
        const newLevelInfo = {
            ...oldLevelInfo,
            placements: EditModeHelper.placementsInsertor(
                oldLevelInfo.placements as PreviewObjectPlacement[],
                previewObjectPlacement
            ),
        };

        dispatch(updateCurrentLevelInfo(newLevelInfo));
    };

    // remove preview object
    const rightClickHandler = (rowIndex: number, colIndex: number) => {
        const oldLevelInfo = currentLevelInfo;
        const newLevelInfo = {
            ...oldLevelInfo,
            placements: EditModeHelper.placementsRemover(oldLevelInfo.placements as PreviewObjectPlacement[], {
                x: rowIndex,
                y: colIndex,
            }),
        };
        dispatch(updateCurrentLevelInfo(newLevelInfo));
    };

    return (
        <EditModeBackgroundTileWrapper
            style={{ cursor: editModeSelectedItem !== null ? "pointer" : "default" }}
            onClick={(e) => leftClickHandler(rowIndex, colIndex)}
            onContextMenu={(e) => {
                e.preventDefault();
                rightClickHandler(rowIndex, colIndex);
            }}
        >
            {children}
        </EditModeBackgroundTileWrapper>
    );
};

export default EditModeWrapper;
