import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import SignageModalWindowBuilder from "./SignageModalWindowBuilder";
import { ModalContent, ModalTitle } from "@/game/components/styled";

const IntroModalModalContent: React.FC = () => {
    return (
        <>
            <ModalTitle>About this World</ModalTitle>
            <ModalContent>This world is created by <span>TypeScript</span>, <span>React JS</span> and <span>Material UI</span>.</ModalContent>
            <ModalContent>Memories from <span>Sanity (headless CMS) </span>are scattered across the world.</ModalContent>
            <ModalContent>Try to capture them.</ModalContent>
        </>
    );
};

const IntroModalWindowComponent: ModalWindowConfig = new SignageModalWindowBuilder().setContent(IntroModalModalContent).build();

export default  IntroModalWindowComponent;