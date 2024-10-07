interface BioInterface {
    name: string[];
    roles: string[];
    description: string;
    github: string;
    resume: string;
    linkedin: string;
    portfolio: string;
}

interface SkillInterface {
    title: string;
    skills: {
        name: string;
        image: any;
    }[];
}

export const Bio: BioInterface = {
    name: ["Chris Lee"],
    roles: [
        "Full Stack Developer",
        "Software Engineer",
        "Web Developer",
        "Front-end Developer",
        "Back-end Developer",
        "Programmer",
    ],
    description:
        "I am a dedicated and self-driven software engineer with practical expertise in developing full-stack web applications and being part of the Agile teams.",
    github: "https://github.com/bigbigphone2",
    resume: "https://drive.google.com/file/d/1WMuEvBOnKK89nAqQGVgnRn_6yYr5RNuO/view?usp=sharing",
    linkedin: "http://linkedin.com/in/chris-lee-bed",
    portfolio: "https://www.yatheilee.xyz/",
};

export const skills: SkillInterface[] = [];
