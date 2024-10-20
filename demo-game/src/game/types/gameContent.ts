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

export type { BioInterface, SkillItem, SkillSetInterface };
