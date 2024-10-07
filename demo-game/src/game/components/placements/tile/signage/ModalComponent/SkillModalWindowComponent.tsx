import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import SignageModalWindowBuilder from "./SignageModalWindowBuilder";
import { ModalTitle } from "@/game/components/styled";

const SkillModalModalContent: React.FC = () => {
    return (
        <>
            <ModalTitle>Skill Ave</ModalTitle>
        </>
    );
};

const SkillModalWindowComponent: ModalWindowConfig = new SignageModalWindowBuilder().setContent(SkillModalModalContent).build();

export default  SkillModalWindowComponent;