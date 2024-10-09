interface BioInterface {
    name: string[];
    roles: string[];
    description: string;
    email: string;
    github: string;
    resume: string;
    linkedin: string;
    portfolio: string;
}

interface SkillItem {
    name: string;
    image: any;
}

interface SkillSetInterface {
    title: string;
    skills: SkillItem[];
}

interface ExperienceInterface {
    id: string;
    img: any;
    role: string;
    company: string;
    date: string;
    desc: string;
    skills: string[];
    achievements: string[];
    links?: {
        title: string;
        address: string;
    }[];
}

interface EducationInterface {
    id: number;
    img: any;
    school: string;
    desc: {
        subTitle: string;
        content: string;
    }[];
    skills: string[];
    degree: string;
}

interface ProjectsInterface {
    id: number;
    title: string;
    nickname: string;
    description: string[];
    image: any;
    tags: string[];
    category: string;
    links: {
        title: string;
        address: string;
    }[];
}

export type { BioInterface, SkillItem, SkillSetInterface, ExperienceInterface, EducationInterface, ProjectsInterface };
