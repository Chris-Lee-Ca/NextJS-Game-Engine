import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import Signage2ModalWindowBuilder from "./Signage2ModalWindowBuilder";
import SkillModalWindowTemplate from "./SkillModalWindowTemplate";
import { SkillSetInterface, SkillSets } from "@/game/lib/gameContent";

const OthersModalModalContent: React.FC = () => {
    return (
        <>
            <SkillModalWindowTemplate skillSet={SkillSets.find((skillSet) => skillSet.title === 'Others') as SkillSetInterface}/>
        </>
    );
};

const OthersModalWindowComponent: ModalWindowConfig = new Signage2ModalWindowBuilder().setContent(OthersModalModalContent).build();

export default  OthersModalWindowComponent;