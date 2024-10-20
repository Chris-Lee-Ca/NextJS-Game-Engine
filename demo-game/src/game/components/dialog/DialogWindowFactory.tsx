import { DialogWindowType as OriginalDialogWindowType } from "@/game/redux/features/dialogSlice";
import DialogWindow from "./DialogWindow";
import { ReactNode } from "react";
import { ResumeDialogWindowComponent } from "../placements/pickUp/resume/DialogComponent";
import { FinishLineDialogWindowComponent } from "../placements/tile/finishLine/DialogComponent";
import IntroDialogWindowComponent from "../IntroDialogWindowComponent";

type DialogWindowType = Exclude<OriginalDialogWindowType, null>;

export interface DialogWindowConfig {
    imageSrc: string;
    content: ReactNode;
    buttonGroup: ReactNode;
}

const dialogWindowComponents: Record<DialogWindowType, DialogWindowConfig> = {
    intro: IntroDialogWindowComponent,
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
