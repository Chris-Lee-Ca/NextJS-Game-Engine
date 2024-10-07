import { DialogWindowType as OriginalDialogWindowType } from "@/game/redux/features/dialogSlice";
import { ResumeDialogContent, ResumeDialogButtonGroup } from "../placements/pickUp/resume/ResumeDialogWindowComponent";
import DialogWindow from "./DialogWindow";
import { ReactNode } from "react";

type DialogWindowType = Exclude<OriginalDialogWindowType, null>;

// Define a type to hold both the component and image source
interface DialogWindowConfig {
    imageSrc: string;
    content: ReactNode;
    buttonGroup: ReactNode;
}

// Map windowType to the respective component and image source
const dialogWindowComponents: Record<DialogWindowType, DialogWindowConfig> = {
    resume: {
        imageSrc: require("../../assets/componentImage/hero.png").default.src,
        content: <ResumeDialogContent />,
        buttonGroup: <ResumeDialogButtonGroup />,
    },
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
