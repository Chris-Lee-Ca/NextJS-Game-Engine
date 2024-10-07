interface BioInterface {
    name: string[];
    roles: string[];
    description: string;
    github: string;
    resume: string;
    linkedin: string;
    portfolio: string;
}

export interface SkillItem{
    name: string;
    image: any;
}

export interface SkillSetInterface {
    title: string;
    skills: SkillItem[];
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

export const SkillSets: SkillSetInterface[] = [
    {
      title: "Languages",
      skills: [
        {
          name: "Java",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
        },
        {
          name: "Python",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        },
        {
          name: "TypeScript",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
        },
        {
          name: "JavaScript",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
        },
        {
          name: "VBA",
          image:
          require("../assets/skillImage/vba-icon.png").default.src,
        },
        {
          name: "SQL",
          image:
            "https://db.cs.uni-tuebingen.de/teaching/ws2223/sql-is-a-programming-language/logo.svg",
        },
        {
          name: "HTML",
          image: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png",
        },
        {
          name: "CSS",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png",
        },
      ],
    },
    {
      title: "Frontend",
      skills: [
        {
          name: "React Js",
          image:
            require("../assets/skillImage/react-icon.png").default.src,
        },
        {
          name: "Redux",
          image:
          "https://skillicons.dev/icons?i=redux",
        },
        {
          name: "Next Js",
          image:
            "https://skillicons.dev/icons?i=nextjs",
        },
        {
          name: "Material UI",
          image:
            "data:image/png;base64,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",
        },
        {
          name: "jQuery",
          image:
          "https://skillicons.dev/icons?i=jquery",
        },
        {
          name: "Webpack",
          image:
          require("../assets/skillImage/webpack-icon.png").default.src,
        },
      ],
    },
    {
      title: "Backend",
      skills: [
        {
          name: "Spring Boot",
          image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Spring_Boot.svg",
        },
        {
          name: "Django",
          image: "https://skillicons.dev/icons?i=django",
        },
        {
          name: "Node Js",
          image: "https://skillicons.dev/icons?i=nodejs",
        },
        {
          name: "Kafka",
          image: "https://skillicons.dev/icons?i=kafka",
        },
        {
          name: "ROS",
          image: "https://skillicons.dev/icons?i=ros",
        },
        {
          name: "Graph Ql",
          image: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",
        },
        {
          name: "MySQL",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
        },
        {
          name: "Postgresql",
          image: "https://www.postgresql.org/media/img/about/press/elephant.png",
        },
        {
          name: "Redis",
          image:
            "https://skillicons.dev/icons?i=redis",
        },
        {
          name: "Ignite",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEVHcEztGyPtHCTsGyPtHCTtHCTtHCTtHCTtHCTtGyPtHCPtHCTtHCTtHCTtHCPtGyPtHCTtHCRAZaeRAAAAEnRSTlMAFKkLlf/fTvgwXs687D0ienH1r4Z8AAAA3ElEQVR4AX3RQQ6FIAxF0Yd4ARRB97/Znx8hGhHPiEHTlld1zGT1ZWbSB+vAa8wGIGrM8V2w8LdowGvlL43GR3EyemFACoxbbGCUOHl1ErDIMxoSAZy0ctr0MNX/Gaq126B2jvC66NU5U81dxHWNEjhl3exUoUipFd8FmqWdhPL8Z5Ws4svRMpes2BeobPeK4xl4kjTTYOXA6uJZJJX1CmFn0s1cg/G0xCKmu8Vs2gtsWfQS1OprCG1+H1TYz6z1ZBzVZiw49fLkahuT2fXO5iMFNjmjD94dRd+ybn71eQnaJKxh5gAAAABJRU5ErkJggg=="      },
        {
          name: "MongoDB",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
        },
      ],
    },
    {
      title: "Others",
      skills: [
        {
          name: "Docker",
          image:
          "https://skillicons.dev/icons?i=docker",
        },
        {
          name: "K8s",
          image:
            "https://skillicons.dev/icons?i=kubernetes",
        },
        {
          name: "AWS",
          image:
            "https://skillicons.dev/icons?i=aws",
        },
        {
          name: "Junit",
          image: "https://asset.brandfetch.io/idD7RfhCFS/id3KSPzOxb.png?updated=1667605689688",
        },
        {
          name: "Unittest",
          image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        },
        {
          name: "Jest",
          image: "https://skillicons.dev/icons?i=jest",
        },
        {
          name: "Git",
          image:
            require("../assets/skillImage/git-icon.png").default.src,
        },
        {
          name: "GitHub",
          image:
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
        {
          name: "GitLab",
          image:
            require("../assets/skillImage/gitlab-icon.png").default.src,
        },
        {
          name: "Jenkin",
          image:
          "https://skillicons.dev/icons?i=jenkins",
        },
        {
          name: "Figma",
          image:
          require("../assets/skillImage/figma-icon.png").default.src,
        },
        {
          name: "Linux",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2560px-Tux.svg.png",
        },
        {
          name: "Raspberrypi",
          image:
            require("../assets/skillImage/raspberrry-pi-logo.png").default.src,
        },
        {
          name: "Regax",
          image:
          require("../assets/skillImage/regex-icon.png").default.src,
        },
        {
          name: "Selenium",
          image:
            "https://skillicons.dev/icons?i=selenium",
        },
        {
          name: "VS Code",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png?20210804221519",
        },
        {
          name: "Postman",
          image:
          require("../assets/skillImage/postman-icon.png").default.src,
        },
      ],
    },
  ];
