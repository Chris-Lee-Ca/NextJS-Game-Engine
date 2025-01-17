type Education = {
    id: string;
    school: string;
    descriptionRaw: any[];
    image: { asset: { url: string } };
    skills: string[];
    degree: string;
};

type Experience = {
    id: string;
    role: string;
    company: string;
    image: { asset: { url: string } };
    date: string;
    descriptionRaw: any[];
    skills: string[];
    achievements: string[];
};

type Project = {
    id: string;
    title: string;
    slug: {
        current: string;
    };
    nickname: string;
    descriptionRaw: any[];
    image: { asset: { url: string } };
    tags: string[];
    category: string;
    links: {
        title: string;
        url: string;
    }[];
};

type GameStaticDataType = {
    allEducation: Education[];
    allExperience: Experience[];
    allProject: Project[];
};

export type { Education, Experience, Project, GameStaticDataType };
