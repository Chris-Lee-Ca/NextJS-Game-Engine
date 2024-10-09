import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import CompanyModalWindowTemplate from "./CompanyModalWindowTemplate";
import { ExperienceInterface } from "@/game/types/gameContent";
import { Experiences } from "@/game/lib/gameContent";
import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";

const RedcliffCompanyModalModalContent: React.FC = () => {
    return (
        <>
            <CompanyModalWindowTemplate
                experience={Experiences.find((experience) => experience.id === "redcliff") as ExperienceInterface}
            />
        </>
    );
};

const RedcliffCompanyModalWindowComponent: ModalWindowConfig = new ModalWindowBuilder()
    .setImageSrc(Experiences.find((experience) => experience.id === "redcliff")?.img)
    .setContent(RedcliffCompanyModalModalContent)
    .build();

export default RedcliffCompanyModalWindowComponent;
