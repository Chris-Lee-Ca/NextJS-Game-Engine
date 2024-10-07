import { useAppDispatch } from "@/game/redux/hooks";
import ActionButton from "./ActionButton";
import { closeModalWindow } from "@/game/redux/features/modalSlice";

const CloseModalButton = () => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closeModalWindow());
    };
    return <ActionButton onClickFunction={handleClose} buttonKey={"l"} buttonDescription={"Close"} />;
};

export default CloseModalButton;
