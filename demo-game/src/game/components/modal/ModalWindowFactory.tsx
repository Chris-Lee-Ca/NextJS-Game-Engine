import { ModalWindowType as OriginalModalWindowType } from "@/game/redux/features/modalSlice";
import ModalWindow from "./ModalWindow";
import { ReactNode } from "react";
import {
    EducationModalWindowComponent,
    ExperienceModalWindowComponent,
    IntroModalWindowComponent,
    ProjectModalWindowComponent,
    SkillModalWindowComponent,
} from "@/game/components/placements/tile/signage/ModalComponent";
import {
    BackendSkillModalWindowComponent,
    FrontendSkillModalWindowComponent,
    LanguageSkillModalWindowComponent,
    OthersSkillModalWindowComponent,
} from "../placements/tile/signage2/ModalComponent";
import {
    PLCompanyModalWindowComponent,
    RedcliffCompanyModalWindowComponent,
    YauLeeCompanyModalWindowComponent,
} from "../placements/tile/company/ModalComponent";
import {
    ArduinoCarModalWindowComponent,
    BigTwoModalWindowComponent,
    CharacterGPTModalWindowComponent,
    FinalYearProjectModalWindowComponent,
    GamehubModalWindowComponent,
    PortfolioGameV1ModalWindowComponent,
    SudokuModalWindowComponent,
} from "../placements/tile/painting/ModalComponent";
import {
    AwsSaaSchoolModalWindowComponent,
    CkadSchoolModalWindowComponent,
    HkuSchoolModalWindowComponent,
} from "../placements/tile/school/ModalComponent";

type ModalWindowType = Exclude<OriginalModalWindowType, null>;

export interface ModalWindowConfig {
    imageSrc: string;
    content: ReactNode;
    buttonGroup: ReactNode;
}

const modalWindowComponents: Record<ModalWindowType, ModalWindowConfig> = {
    intro: IntroModalWindowComponent,
    skill: SkillModalWindowComponent,
    project: ProjectModalWindowComponent,
    education: EducationModalWindowComponent,
    experience: ExperienceModalWindowComponent,
    "skill-languages": LanguageSkillModalWindowComponent,
    "skill-frontend": FrontendSkillModalWindowComponent,
    "skill-backend": BackendSkillModalWindowComponent,
    "skill-others": OthersSkillModalWindowComponent,
    "company-yau-lee": YauLeeCompanyModalWindowComponent,
    "company-pl": PLCompanyModalWindowComponent,
    "company-redcliff": RedcliffCompanyModalWindowComponent,
    "project-gamehub": GamehubModalWindowComponent,
    "project-big-two": BigTwoModalWindowComponent,
    "project-character-gpt": CharacterGPTModalWindowComponent,
    "project-sudoku": SudokuModalWindowComponent,
    "project-final-year-project": FinalYearProjectModalWindowComponent,
    "project-arduino-car": ArduinoCarModalWindowComponent,
    "project-portfolio-game-v1": PortfolioGameV1ModalWindowComponent,
    "school-hku": HkuSchoolModalWindowComponent,
    "school-ckad": CkadSchoolModalWindowComponent,
    "school-aws-saa": AwsSaaSchoolModalWindowComponent,
};

interface ModalWindowFactoryProps {
    windowType: ModalWindowType;
}

const ModalWindowFactory = (props: ModalWindowFactoryProps) => {
    const { windowType } = props;

    const config = modalWindowComponents[windowType];

    if (!config) {
        throw new Error(`Unknown modal type: ${windowType}`);
    }
    const { imageSrc, content, buttonGroup } = config;
    return <ModalWindow imageSrc={imageSrc} content={content} buttonGroup={buttonGroup} />;
};

export default ModalWindowFactory;
