import { CUSTOM_STYLE, EDIT_MODE_LEVEL_NAME } from "@/game/lib/conts";
import { updateEditMode } from "@/game/redux/features/editModeSlice";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { Button } from "@mui/material";
import React, { Suspense } from "react";
import ModeIcon from "@mui/icons-material/Mode";
import { setLevelInfoByKey } from "game-engine/extensions/plugins/levelPlugin";
import { PreviewObjectPlacement } from "@/game/types/placement";
import EditModeHelper from "@/game/helper/EditModeHelper";

export const LevelEditorStatusBarButton = () => {
    const { editMode: isEditMode, editModeLevelInfo } = useAppSelector((state) => state.editMode);

    const dispatch = useAppDispatch();

    const LazyLevelEditorComponent = React.lazy(() => import("./LevelEditor"));

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
                        // validate
                        const placements = editModeLevelInfo.placements as PreviewObjectPlacement[];
                        const { isValid, errMessage } = EditModeHelper.placementsValidator(placements);
                        if (!isValid) {
                            window.alert(errMessage);
                            return;
                        }
                        // convert
                        const newPlacements = EditModeHelper.previewObjectConvertor(placements);
                        const newEditModeLevelInfo = { ...editModeLevelInfo, placements: newPlacements };
                        dispatch(setLevelInfoByKey({ key: EDIT_MODE_LEVEL_NAME, levelInfo: newEditModeLevelInfo }));
                        dispatch(updateEditMode(false));
                    } else {
                        dispatch(updateEditMode(true));
                    }
                }}
            >
                <ModeIcon />
            </Button>
            <Suspense fallback={<div />}>{isEditMode && <LazyLevelEditorComponent />}</Suspense>
        </>
    );
};
