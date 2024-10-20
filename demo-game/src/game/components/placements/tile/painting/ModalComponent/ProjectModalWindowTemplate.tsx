import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";
import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import { ModalBlockContent, ModalTitle } from "@/game/components/styled";
import ActionButton from "@/game/components/template/ActionButton";
import CloseModalButton from "@/game/components/template/CloseModalButton";
import SanityBlockContent from "@/game/components/template/SanityBlockContent";
import { reduxStore } from "@/game/redux/store";
import { projectNicknameMapping } from "@/game/sanity/sanityContentMapping";
import { Project } from "@/game/types/gameStaticData";
import { Box, styled, Typography } from "@mui/material";

const SkillsContainer = styled(Box)({
    margin: "0px 0px 10px",
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

const KeyFeatures = styled(Box)({
    margin: "20px 0px 6px 20px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
});

interface ProjectModalWindowTemplateProps {
    project: Project;
}

export const ProjectModalWindowTemplate: React.FC<ProjectModalWindowTemplateProps> = (props) => {
    const { project } = props;

    return (
        <>
            <ModalTitle>{project.title}</ModalTitle>
            <ModalBlockContent
                style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <SkillsContainer>
                    <SkillWrapper>
                        {project.tags.map((tag, index) => (
                            <Skill key={index}>• {tag}</Skill>
                        ))}
                    </SkillWrapper>
                </SkillsContainer>
                <Typography mt={2} fontWeight={800} fontSize={"20px"}>
                    Key Features:
                </Typography>
                <KeyFeatures>
                    <SanityBlockContent content={project.descriptionRaw} />
                </KeyFeatures>
            </ModalBlockContent>
        </>
    );
};

export const createProjectPaintingModalWindowComponent = (projectNickname: string): ModalWindowConfig => {
    const data = reduxStore.getState().gameContent.data;
    const { allProject } = data!;

    const project = allProject.find(
        (project) => project.slug.current === projectNicknameMapping[projectNickname]
    ) as Project;

    const ContentComponent: React.FC = () => <ProjectModalWindowTemplate project={project} />;

    const ButtonGroup: React.FC = () => {
        const handleOnClick = () => {
            window.open(project.links[0].url, "_blank");
        };

        return (
            <>
                <ActionButton
                    onClickFunction={handleOnClick}
                    buttonKey={"k"}
                    buttonDescription={project.links[0].title}
                />
                <Box mr={2} />
                <CloseModalButton />
            </>
        );
    };

    return new ModalWindowBuilder()
        .setImageSrc(project.image.asset.url)
        .setContent(ContentComponent)
        .setButtonGroup(ButtonGroup)
        .build();
};
