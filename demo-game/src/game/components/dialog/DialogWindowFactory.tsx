import { DialogWindowType as OriginalDialogWindowType } from "@/game/redux/features/dialogSlice";
import ResumeDialogWindowComponent from "../placements/pickUp/resume/ResumeDialogWindowComponent";
import DialogWindow from "./DialogWindow";
import { ReactNode } from "react";
import { FinishLineDialogWindowComponent } from "../placements/tile/finishLine/DialogComponent";

type DialogWindowType = Exclude<OriginalDialogWindowType, null>;

export interface DialogWindowConfig {
    imageSrc: string;
    content: ReactNode;
    buttonGroup: ReactNode;
}

const dialogWindowComponents: Record<DialogWindowType, DialogWindowConfig> = {
    resume: ResumeDialogWindowComponent,
    "finish-line": FinishLineDialogWindowComponent,
};

interface DialogWindowFactoryProps {
    windowType: DialogWindowType;
}

const DialogWindowFactory = (props: DialogWindowFactoryProps) => {
    const { windowType } = props;

    const config = dialogWindowComponents[windowType];

    if (!config) {
        throw new Error(`Unknown dialog type: ${windowType}`);
    }
    const { imageSrc, content, buttonGroup } = config;
    return <DialogWindow imageSrc={imageSrc} content={content} buttonGroup={buttonGroup} />;
};

export default DialogWindowFactory;
