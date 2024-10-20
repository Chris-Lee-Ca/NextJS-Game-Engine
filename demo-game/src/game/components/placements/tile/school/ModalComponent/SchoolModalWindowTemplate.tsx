import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";
import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import { ModalBlockContent, ModalSubTitle, ModalTitle } from "@/game/components/styled";
import SanityBlockContent from "@/game/components/template/SanityBlockContent";
import { reduxStore } from "@/game/redux/store";
import { educationIdMapping } from "@/game/sanity/sanityContentMapping";
import { Education } from "@/game/types/gameStaticData";
import { Box, styled } from "@mui/material";

const SkillsContainer = styled(Box)({
    margin: "20px 0px 10px",
    display: "flex",
    justifyContent: "center",
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

interface SchoolModalWindowTemplateProps {
    education: Education;
}

export const SchoolModalWindowTemplate: React.FC<SchoolModalWindowTemplateProps> = (props) => {
    const { education } = props;

    return (
        <>
            <ModalTitle>{education.school}</ModalTitle>
            <ModalSubTitle>{education.degree}</ModalSubTitle>
            <ModalBlockContent>
                <SanityBlockContent content={education.descriptionRaw} />
                <SkillsContainer>
                    <SkillWrapper>
                        {education.skills.map((skill, index) => (
                            <Skill key={index}>• {skill}</Skill>
                        ))}
                    </SkillWrapper>
                </SkillsContainer>
            </ModalBlockContent>
        </>
    );
};

export const createSchoolModalWindowComponent = (educationId: string): ModalWindowConfig => {
    const data = reduxStore.getState().gameContent.data;
    const { allEducation } = data!;

    const education = allEducation.find(
        (education) => education.school === educationIdMapping[educationId]
    ) as Education;

    const ContentComponent: React.FC = () => <SchoolModalWindowTemplate education={education} />;

    return new ModalWindowBuilder().setImageSrc(education.image.asset.url).setContent(ContentComponent).build();
};
