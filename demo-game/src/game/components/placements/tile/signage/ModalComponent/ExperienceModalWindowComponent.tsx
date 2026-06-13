import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import SignageModalWindowBuilder from "./SignageModalWindowBuilder";
import { ModalTitle } from "@/game/components/styled";

const ExperienceModalModalContent: React.FC = () => {
    return (
        <>
            <ModalTitle>Quest Log</ModalTitle>
        </>
    );
};

const ExperienceModalWindowComponent: ModalWindowConfig = new SignageModalWindowBuilder().setContent(ExperienceModalModalContent).build();

export default  ExperienceModalWindowComponent;