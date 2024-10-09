import React from "react";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/system";
import { Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { closeAlert } from "@/game/redux/features/alertSlice";

const StyledAlert: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isOpenAlertWindow, type, content, ttl } = useAppSelector((state) => state.alert);

    const handleClose = () => {
        dispatch(closeAlert());
    };

    return (
        <Snackbar open={isOpenAlertWindow} autoHideDuration={ttl} onClose={handleClose}>
            <Box
                sx={{ width: "300px", position: "fixed", zIndex: "100", left: "50%", marginLeft: "-150px", top: "10%" }}
            >
                <Alert variant="filled" severity={type}>
                    {content}
                </Alert>
            </Box>
        </Snackbar>
    );
};

export default StyledAlert;
