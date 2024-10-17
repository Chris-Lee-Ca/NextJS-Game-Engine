import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";
import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import { ModalTitle } from "@/game/components/styled";
import ActionButton from "@/game/components/template/ActionButton";
import CloseModalButton from "@/game/components/template/CloseModalButton";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { Projects } from "@/game/lib/gameContent";
import { ProjectsInterface } from "@/game/types/gameContent";
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

const KeyFeatures = styled(Box)({
    margin: "0px 30px 6px 0px",
});

interface ProjectModalWindowTemplateProps {
    project: ProjectsInterface;
}

export const ProjectModalWindowTemplate: React.FC<ProjectModalWindowTemplateProps> = (props) => {
    const { project } = props;

    return (
        <>
            <ModalTitle>{project.title}</ModalTitle>
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
                <div>{project.description}</div>
            </KeyFeatures>
        </>
    );
};

export const createProjectPaintingModalWindowComponent = (projectNickname: string): ModalWindowConfig => {
    const project = Projects.find((project) => project.nickname === projectNickname) as ProjectsInterface;

    const ContentComponent: React.FC = () => <ProjectModalWindowTemplate project={project} />;
    const ButtonGroup: React.FC = () => {
        // const dispatch = useAppDispatch();

        const handleOnClick = () => {
            window.open(project.links[0].address, "_blank");
            // dispatch(closeDialogWindow());
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
        .setImageSrc(project.image)
        .setContent(ContentComponent)
        .setButtonGroup(ButtonGroup)
        .build();
};
