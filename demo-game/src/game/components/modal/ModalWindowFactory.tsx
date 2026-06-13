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
    ArduinoCarModalWindowComponent,
    BigTwoModalWindowComponent,
    CharacterGPTModalWindowComponent,
    FinalYearProjectModalWindowComponent,
    GamehubModalWindowComponent,
    PortfolioGameV1ModalWindowComponent,
    SudokuModalWindowComponent,
    NextJSGameEngineModalWindowComponent,
} from "../placements/tile/painting/ModalComponent";
import {
    AwsSaaSchoolModalWindowComponent,
    CkadSchoolModalWindowComponent,
    HkuSchoolModalWindowComponent,
} from "../placements/tile/school/ModalComponent";

export interface ModalWindowConfig {
    imageSrc: string;
    content: ReactNode;
    buttonGroup: ReactNode;
}

type StaticModalWindowType =
    | "intro"
    | "skill"
    | "project"
    | "education"
    | "experience"
    | "skill-languages"
    | "skill-frontend"
    | "skill-backend"
    | "skill-others"
    | "project-gamehub"
    | "project-big-two"
    | "project-character-gpt"
    | "project-sudoku"
    | "project-final-year-project"
    | "project-arduino-car"
    | "project-portfolio-game-v1"
    | "project-next-js-game-engine"
    | "school-hku"
    | "school-ckad"
    | "school-aws-saa";

const staticModalWindowComponents: Record<StaticModalWindowType, ModalWindowConfig> = {
    intro: IntroModalWindowComponent,
    skill: SkillModalWindowComponent,
    project: ProjectModalWindowComponent,
    education: EducationModalWindowComponent,
    experience: ExperienceModalWindowComponent,
    "skill-languages": LanguageSkillModalWindowComponent,
    "skill-frontend": FrontendSkillModalWindowComponent,
    "skill-backend": BackendSkillModalWindowComponent,
    "skill-others": OthersSkillModalWindowComponent,
    "project-gamehub": GamehubModalWindowComponent,
    "project-big-two": BigTwoModalWindowComponent,
    "project-character-gpt": CharacterGPTModalWindowComponent,
    "project-sudoku": SudokuModalWindowComponent,
    "project-final-year-project": FinalYearProjectModalWindowComponent,
    "project-arduino-car": ArduinoCarModalWindowComponent,
    "project-portfolio-game-v1": PortfolioGameV1ModalWindowComponent,
    "project-next-js-game-engine": NextJSGameEngineModalWindowComponent,
    "school-hku": HkuSchoolModalWindowComponent,
    "school-ckad": CkadSchoolModalWindowComponent,
    "school-aws-saa": AwsSaaSchoolModalWindowComponent,
};

type ModalResolver = (id: string) => ModalWindowConfig;
const resolvers: { prefix: string; resolve: ModalResolver }[] = [];

export const registerModalResolver = (prefix: string, resolve: ModalResolver): void => {
    resolvers.push({ prefix, resolve });
};

interface ModalWindowFactoryProps {
    windowType: string;
}

const ModalWindowFactory = (props: ModalWindowFactoryProps) => {
    const { windowType } = props;

    let config: ModalWindowConfig | undefined;

    for (const { prefix, resolve } of resolvers) {
        if (windowType.startsWith(prefix)) {
            config = resolve(windowType.slice(prefix.length));
            break;
        }
    }

    if (!config) {
        config = staticModalWindowComponents[windowType as StaticModalWindowType];
    }

    if (!config) {
        throw new Error(`Unknown modal type: "${windowType}". Register a resolver or add it to staticModalWindowComponents.`);
    }

    const { imageSrc, content, buttonGroup } = config;
    return <ModalWindow imageSrc={imageSrc} content={content} buttonGroup={buttonGroup} />;
};

export default ModalWindowFactory;
