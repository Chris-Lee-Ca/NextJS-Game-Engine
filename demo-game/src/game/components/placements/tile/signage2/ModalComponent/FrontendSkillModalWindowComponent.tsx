import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import Signage2ModalWindowBuilder from "./Signage2ModalWindowBuilder";
import SkillModalWindowTemplate from "./SkillModalWindowTemplate";
import { SkillSetInterface } from "@/game/types/gameContent";
import { SkillSets } from "@/game/lib/gameContent";

const FrontendModalModalContent: React.FC = () => {
    return (
        <>
            <SkillModalWindowTemplate
                skillSet={SkillSets.find((skillSet) => skillSet.title === "Frontend") as SkillSetInterface}
            />
        </>
    );
};

const FrontendModalWindowComponent: ModalWindowConfig = new Signage2ModalWindowBuilder()
    .setContent(FrontendModalModalContent)
    .build();

export default FrontendModalWindowComponent;
