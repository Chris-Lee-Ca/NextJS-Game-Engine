import { closeDialogWindow } from "@/game/redux/features/dialogSlice";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import ActionButton from "./ActionButton";

const CloseActionButton = () => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closeDialogWindow());
    };
    return <ActionButton onClickFunction={handleClose} buttonKey={"K"} buttonDescription={"Close"} />;
};

export default CloseActionButton;
