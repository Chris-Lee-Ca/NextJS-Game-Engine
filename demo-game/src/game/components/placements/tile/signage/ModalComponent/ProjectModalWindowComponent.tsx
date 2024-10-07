import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import SignageModalWindowBuilder from "./SignageModalWindowBuilder";
import { ModalTitle } from "@/game/components/styled";

const ProjectModalModalContent: React.FC = () => {
    return (
        <>
            <ModalTitle>Project Ave</ModalTitle>
        </>
    );
};

const ProjectModalWindowComponent: ModalWindowConfig = new SignageModalWindowBuilder().setContent(ProjectModalModalContent).build();

export default  ProjectModalWindowComponent;