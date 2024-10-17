import { CUSTOM_STYLE, EDIT_MODE_LEVEL_NAME } from "@/game/lib/conts";
import { syncEditModeLevelInfo, updateEditMode } from "@/game/redux/features/editModeSlice";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { Button } from "@mui/material";
import React, { Suspense } from "react";
import ModeIcon from "@mui/icons-material/Mode";
import { setCurrentLevel, setLevelInfoByKey } from "game-engine/extensions/plugins/levelPlugin";
import { PreviewObjectPlacement } from "@/game/types/placement";
import EditModeHelper from "@/game/helper/EditModeHelper";

export const LevelEditorStatusBarButton = () => {
    const { editMode: isEditMode, editModeLevelInfo } = useAppSelector((state) => state.editMode);

    const dispatch = useAppDispatch();

    const LazyLevelEditorComponent = React.lazy(() => import("./LevelEditor"));

    const handleApplyEditModeChanges = () => {
        // validate
        const placements = editModeLevelInfo.placements as PreviewObjectPlacement[];
        const { isValid, errMessage } = EditModeHelper.placementsValidator(placements);
        if (!isValid) {
            window.alert(errMessage);
            return;
        }
        // convert
        const newPlacements = EditModeHelper.previewObjectToPlacement(placements);
        const newEditModeLevelInfo = { ...editModeLevelInfo, placements: newPlacements };
        dispatch(setLevelInfoByKey({ key: newEditModeLevelInfo.levelTitle, levelInfo: newEditModeLevelInfo }));
        dispatch(setCurrentLevel(newEditModeLevelInfo.levelTitle));

        dispatch(updateEditMode(false));
    };

    const handleTurnOnEditMode = () => {
        const defaultEditModeLevelInfo = EditModeHelper.editModeLevelInfoInitializr();
        dispatch(syncEditModeLevelInfo(defaultEditModeLevelInfo));
        dispatch(setCurrentLevel(EDIT_MODE_LEVEL_NAME));

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
