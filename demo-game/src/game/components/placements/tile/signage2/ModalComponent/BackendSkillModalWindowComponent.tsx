import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import Signage2ModalWindowBuilder from "./Signage2ModalWindowBuilder";
import SkillModalWindowTemplate from "./SkillModalWindowTemplate";
import { SkillSetInterface } from "@/game/types/gameContent";
import { SkillSets } from "@/game/lib/gameContent";

const BackendModalModalContent: React.FC = () => {
    return (
        <>
            <SkillModalWindowTemplate
                skillSet={SkillSets.find((skillSet) => skillSet.title === "Backend") as SkillSetInterface}
            />
        </>
    );
};

const BackendModalWindowComponent: ModalWindowConfig = new Signage2ModalWindowBuilder()
    .setContent(BackendModalModalContent)
    .build();

export default BackendModalWindowComponent;
