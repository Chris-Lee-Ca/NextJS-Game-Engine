import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";
import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import { ModalSubTitle, ModalTitle } from "@/game/components/styled";
import SanityBlockContent from "@/game/components/template/SanityBlockContent";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { reduxStore } from "@/game/redux/store";
import { experienceIdMapping } from "@/game/sanity/sanityContentMapping";
import { Experience } from "@/game/types/gameStaticData";
import { Box, styled, Typography } from "@mui/material";

const Date = styled(Typography)({
    fontWeight: "bold",
    fontSize: "20x",
    color: CUSTOM_STYLE.COLOR.MAIN_PANEL_COLOR,
    marginTop: "5px",
});

const SkillsContainer = styled(Box)({
    margin: "10px 0px 10px",
    display: "flex",
});

const SkillWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "8px",
});

const Skill = styled(Box)({
    fontSize: "15px",
    fontWeight: "400",
});

const Description = styled(Typography)({
    fontWeight: "bold",
    margin: "15px",
});

const Achievements = styled("ul")({
    margin: "8px 0px 6px 0px",
});

const Achievement = styled("li")({
    width: "100%",
    fontWeight: "normal",
    marginTop: "10px",
    margin: "5px 5px 5px 5px",
});

interface CompanyModalWindowTemplateProps {
    experience: Experience;
}

export const CompanyModalWindowTemplate: React.FC<CompanyModalWindowTemplateProps> = (props) => {
    const { experience } = props;

    return (
        <>
            <ModalTitle>{experience.role}</ModalTitle>
            <ModalSubTitle>{experience.company}</ModalSubTitle>
            <Date>{experience.date}</Date>
            <SkillsContainer>
                <SkillWrapper>
                    {experience.skills.map((skill, index) => (
                        <Skill key={index}>• {skill}</Skill>
                    ))}
                </SkillWrapper>
            </SkillsContainer>
            <SanityBlockContent content={experience.descriptionRaw} />
            <Typography mt={1} fontWeight={800} fontSize={"15px"}>
                Key Achievements:
            </Typography>
            {experience.achievements.map((achievement, index) => (
                <Achievements key={index}>
                    <Achievement>{achievement}</Achievement>
                </Achievements>
            ))}
        </>
    );
};

export const createCompanyModalWindowComponent = (experienceId: string): ModalWindowConfig => {
    const data = reduxStore.getState().gameContent.data;
    const { allExperience } = data!;

    const experience = allExperience.find(
        (experience) => experience.company === experienceIdMapping[experienceId]
    ) as Experience;

    const ContentComponent: React.FC = () => <CompanyModalWindowTemplate experience={experience} />;

    return new ModalWindowBuilder().setImageSrc(experience.image.asset.url).setContent(ContentComponent).build();
};
