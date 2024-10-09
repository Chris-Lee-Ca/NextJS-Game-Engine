import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import CompanyModalWindowTemplate from "./CompanyModalWindowTemplate";
import { ExperienceInterface } from "@/game/types/gameContent";
import { Experiences } from "@/game/lib/gameContent";
import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";

const YauLeeCompanyModalModalContent: React.FC = () => {
    return (
        <>
            <CompanyModalWindowTemplate
                experience={Experiences.find((experience) => experience.id === "yau-lee") as ExperienceInterface}
            />
        </>
    );
};

const YauLeeCompanyModalWindowComponent: ModalWindowConfig = new ModalWindowBuilder()
    .setImageSrc(Experiences.find((experience) => experience.id === "yau-lee")?.img)
    .setContent(YauLeeCompanyModalModalContent)
    .build();

export default YauLeeCompanyModalWindowComponent;
