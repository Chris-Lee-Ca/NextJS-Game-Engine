import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import CompanyModalWindowTemplate from "./CompanyModalWindowTemplate";
import { ExperienceInterface } from "@/game/types/gameContent";
import { Experiences } from "@/game/lib/gameContent";
import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";

const PLCompanyModalModalContent: React.FC = () => {
    return (
        <>
            <CompanyModalWindowTemplate
                experience={Experiences.find((experience) => experience.id === "pl") as ExperienceInterface}
            />
        </>
    );
};

const PLCompanyModalWindowComponent: ModalWindowConfig = new ModalWindowBuilder()
    .setImageSrc(Experiences.find((experience) => experience.id === "pl")?.img)
    .setContent(PLCompanyModalModalContent)
    .build();

export default PLCompanyModalWindowComponent;
