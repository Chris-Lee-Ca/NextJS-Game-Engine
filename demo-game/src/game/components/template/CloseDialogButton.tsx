import { closeDialogWindow } from "@/game/redux/features/dialogSlice";
import { useAppDispatch } from "@/game/redux/hooks";
import ActionButton from "./ActionButton";

const CloseDialogButton = () => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closeDialogWindow());
    };
    return <ActionButton onClickFunction={handleClose} buttonKey={"l"} buttonDescription={"Close"} />;
};

export default CloseDialogButton;
