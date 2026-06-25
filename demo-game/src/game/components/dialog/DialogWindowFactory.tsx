import { DialogWindowType as OriginalDialogWindowType } from "@/game/redux/features/dialogSlice";
import DialogWindow from "./DialogWindow";
import { ReactNode } from "react";
import { ResumeDialogWindowComponent } from "../placements/pickUp/resume/DialogComponent";
import { FinishLineDialogWindowComponent } from "../placements/tile/finishLine/DialogComponent";
import IntroDialogWindowComponent from "../IntroDialogWindowComponent";

type StaticDialogWindowType = Exclude<OriginalDialogWindowType, null>;

export interface DialogWindowConfig {
    imageSrc: string;
    content: ReactNode;
    buttonGroup: ReactNode;
}

const staticDialogWindowComponents: Record<StaticDialogWindowType, DialogWindowConfig> = {
    intro: IntroDialogWindowComponent,
    resume: ResumeDialogWindowComponent,
    "finish-line": FinishLineDialogWindowComponent,
};

type DialogResolver = (id: string) => DialogWindowConfig;
const resolvers: { prefix: string; resolve: DialogResolver }[] = [];

// Lets callers register a dynamic dialog type prefix without editing this file
// (mirrors registerModalResolver in ModalWindowFactory.tsx).
export const registerDialogResolver = (prefix: string, resolve: DialogResolver): void => {
    resolvers.push({ prefix, resolve });
};

interface DialogWindowFactoryProps {
    windowType: string;
}

const DialogWindowFactory = (props: DialogWindowFactoryProps) => {
    const { windowType } = props;

    let config: DialogWindowConfig | undefined;

    for (const { prefix, resolve } of resolvers) {
        if (windowType.startsWith(prefix)) {
            config = resolve(windowType.slice(prefix.length));
            break;
        }
    }

    if (!config) {
        config = staticDialogWindowComponents[windowType as StaticDialogWindowType];
    }

    if (!config) {
        throw new Error(`Unknown dialog type: "${windowType}". Register a resolver or add it to staticDialogWindowComponents.`);
    }

    const { imageSrc, content, buttonGroup } = config;
    return <DialogWindow imageSrc={imageSrc} content={content} buttonGroup={buttonGroup} />;
};

export default DialogWindowFactory;
