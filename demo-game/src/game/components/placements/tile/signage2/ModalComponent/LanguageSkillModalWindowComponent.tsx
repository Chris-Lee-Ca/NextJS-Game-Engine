import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import Signage2ModalWindowBuilder from "./Signage2ModalWindowBuilder";
import SkillModalWindowTemplate from "./SkillModalWindowTemplate";
import { SkillSetInterface, SkillSets } from "@/game/lib/gameContent";

const LanguageModalModalContent: React.FC = () => {
    return (
        <>
            <SkillModalWindowTemplate skillSet={SkillSets.find((skillSet) => skillSet.title === 'Languages') as SkillSetInterface}/>
        </>
    );
};

const LanguageModalWindowComponent: ModalWindowConfig = new Signage2ModalWindowBuilder().setContent(LanguageModalModalContent).build();

export default  LanguageModalWindowComponent;