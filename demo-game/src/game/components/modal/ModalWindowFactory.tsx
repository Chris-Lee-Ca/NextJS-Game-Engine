import { ModalWindowType as OriginalModalWindowType } from "@/game/redux/features/modalSlice";
import ModalWindow from "./ModalWindow";
import { ReactNode } from "react";
import SignageModalWindowComponent from "@/game/components/placements/tile/signage/SignageModalWindowComponent"

type ModalWindowType = Exclude<OriginalModalWindowType, null>;

export interface ModalWindowConfig {
    imageSrc: string;
    content: ReactNode;
    buttonGroup: ReactNode;
}

const modalWindowComponents: Record<ModalWindowType, ModalWindowConfig> = {
    intro: SignageModalWindowComponent,
};

interface ModalWindowFactoryProps {
    windowType: ModalWindowType;
}

const ModalWindowFactory = (props: ModalWindowFactoryProps) => {
    const { windowType } = props;

    const config = modalWindowComponents[windowType];

    if (!config) {
        throw new Error(`Unknown modal type: ${windowType}`);
    }
    const { imageSrc, content, buttonGroup } = config;
    return <ModalWindow imageSrc={imageSrc} content={content} buttonGroup={buttonGroup} />;
};

export default ModalWindowFactory;
