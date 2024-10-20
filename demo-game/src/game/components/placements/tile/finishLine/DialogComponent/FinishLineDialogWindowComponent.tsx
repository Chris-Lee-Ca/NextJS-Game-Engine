import DialogWindowBuilder from "@/game/components/dialog/DialogWindowBuilder";
import { DialogWindowConfig } from "@/game/components/dialog/DialogWindowFactory";
import { DialogContent } from "@/game/components/styled";
import ActionButton from "@/game/components/template/ActionButton";
import CloseDialogButton from "@/game/components/template/CloseDialogButton";
import TypeWriter from "@/game/components/TypeWriter";
import { Bio } from "@/game/lib/gameContent";

const FinishLineDialogContent: React.FC = () => {
    return (
        <>
            <DialogContent>
                <TypeWriter content={"I believe I've figured out who I am. Thank you!"} />
            </DialogContent>
        </>
    );
};

const FinishLineDialogButtonGroup: React.FC = () => {
    const handleOnClickContactMe = () => {
        const subject = "Contact Request";
        const body = "Hi, I would like to get in touch with you.";
        window.location.href = `mailto:${Bio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            body
        )}`;
    };

    return (
        <>
            <ActionButton onClickFunction={handleOnClickContactMe} buttonKey={"k"} buttonDescription={"Contact"} />
            <CloseDialogButton />
        </>
    );
};

const FinishLineDialogWindowComponent: DialogWindowConfig = new DialogWindowBuilder()
    .setImageSrc(require("../../../../../assets/componentImage/hero.png").default.src)
    .setContent(FinishLineDialogContent)
    .setButtonGroup(FinishLineDialogButtonGroup)
    .build();

export default FinishLineDialogWindowComponent;
