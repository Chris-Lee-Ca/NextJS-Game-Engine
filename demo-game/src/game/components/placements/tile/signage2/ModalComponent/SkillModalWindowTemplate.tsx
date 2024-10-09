import { ModalContent, ModalTitle } from "@/game/components/styled";
import { CUSTOM_STYLE } from "@/game/lib/conts";
import { SkillSetInterface } from "@/game/types/gameContent";
import { Box, styled, Typography } from "@mui/material";
import Image from "game-engine/components/Image";

const SkillSetContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
});

const SkillSet = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    margin: "5px",
    borderRadius: "10px",
    border: `2px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PAPER_COLOR,
});

const SkillName = styled(Typography)({
    marginLeft: "5px",
    fontWeight: "bold",
});

interface SkillModalWindowTemplateProps {
    skillSet: SkillSetInterface;
}

const SkillModalWindowTemplate: React.FC<SkillModalWindowTemplateProps> = (props) => {
    const { skillSet } = props;

    return (
        <>
            <ModalTitle>{skillSet.title}</ModalTitle>
            <ModalContent>
                <SkillSetContainer>
                    {skillSet.skills.map((skill, idnex) => (
                        <SkillSet key={idnex}>
                            <Image
                                src={skill.image}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    objectFit: "contain",
                                }}
                            />
                            <SkillName>{skill.name}</SkillName>
                        </SkillSet>
                    ))}
                </SkillSetContainer>
            </ModalContent>
        </>
    );
};

export default SkillModalWindowTemplate;
