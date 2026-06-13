import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import SignageModalWindowBuilder from "./SignageModalWindowBuilder";
import { ModalTitle } from "@/game/components/styled";

const EducationModalModalContent: React.FC = () => {
    return (
        <>
            <ModalTitle>Origin Story</ModalTitle>
        </>
    );
};

const EducationModalWindowComponent: ModalWindowConfig = new SignageModalWindowBuilder().setContent(EducationModalModalContent).build();

export default  EducationModalWindowComponent;