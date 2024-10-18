import { CUSTOM_STYLE } from "@/game/lib/conts";
import { updateEditMode } from "@/game/redux/features/editModeSlice";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { Button } from "@mui/material";
import React, { Suspense } from "react";
import ModeIcon from "@mui/icons-material/Mode";
import { LevelInfo, selectCurrentLevelInfo } from "game-engine/extensions/plugins/levelPlugin";
import { CustomPlacement, PreviewObjectPlacement } from "@/game/types/placement";
import EditModeHelper from "@/game/helper/EditModeHelper";
import { Placement } from "game-engine/types/general";
import { updateCurrentLevelInfo } from "game-engine/extensions/plugins/levelPlugin";

export const LevelEditorStatusBarButton = () => {
    const { editMode: isEditMode } = useAppSelector((state) => state.editMode);
    const levelInfo = useAppSelector(selectCurrentLevelInfo);

    const dispatch = useAppDispatch();

    const LazyLevelEditorComponent = React.lazy(() => import("./LevelEditor"));

    const handleApplyEditModeChanges = () => {
        // validate
        const placements = levelInfo.placements as PreviewObjectPlacement[];
        const { isValid, errMessage } = EditModeHelper.placementsValidator(placements);
        if (!isValid) {
            window.alert(errMessage);
            return;
        }
        // convert
        const newPlacements = EditModeHelper.previewObjectPlacementListToPlacementList(placements);
        const newLevelInfo = { ...levelInfo, placements: newPlacements };
        dispatch(updateCurrentLevelInfo(newLevelInfo));

        dispatch(updateEditMode(false));
    };

    const handleTurnOnEditMode = () => {
        const newLevelInfo: LevelInfo = {
            ...levelInfo,
            placements: EditModeHelper.placementListToPreviewObjectPlacementList(
                levelInfo.placements as CustomPlacement[]
            ) as Placement[],
        };
        dispatch(updateCurrentLevelInfo(newLevelInfo));

        dispatch(updateEditMode(true));
    };

    return (
        <>
            <Button
                variant="outlined"
                style={{
                    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_TEXT_COLOR,
                    color: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
                }}
                onClick={() => {
                    if (isEditMode) {
                        handleApplyEditModeChanges();
                    } else {
                        handleTurnOnEditMode();
                    }
                }}
            >
                <ModeIcon />
            </Button>
            <Suspense fallback={<div />}>{isEditMode && <LazyLevelEditorComponent />}</Suspense>
        </>
    );
};
