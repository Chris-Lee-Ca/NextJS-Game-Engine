import DialogWindowBuilder from "@/game/components/dialog/DialogWindowBuilder";
import { DialogWindowConfig } from "@/game/components/dialog/DialogWindowFactory";
import { DialogContent } from "@/game/components/styled";
import ActionButton from "@/game/components/template/ActionButton";
import CloseDialogButton from "@/game/components/template/CloseDialogButton";
import TypeWriter from "@/game/components/TypeWriter";
import { Bio } from "@/game/lib/gameContent";
import { closeDialogWindow } from "@/game/redux/features/dialogSlice";
import { useAppDispatch } from "@/game/redux/hooks";

const ResumeDialogContent: React.FC = () => {
    return (
        <>
            <DialogContent>
                <TypeWriter content={"I discovered an attractive piece of paper on the ground."} />
            </DialogContent>
        </>
    );
};

const ResumeDialogButtonGroup: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleOnClickReadIt = () => {
        window.open(Bio.resume, "_blank");
        dispatch(closeDialogWindow());
    };

    return (
        <>
            <ActionButton onClickFunction={handleOnClickReadIt} buttonKey={"k"} buttonDescription={"Read It"} />
            <CloseDialogButton />
        </>
    );
};

const ResumeDialogWindowComponent: DialogWindowConfig = new DialogWindowBuilder()
    .setImageSrc(require("../../../../../assets/componentImage/paper.png").default.src)
    .setContent(ResumeDialogContent)
    .setButtonGroup(ResumeDialogButtonGroup)
    .build();

export default ResumeDialogWindowComponent;
