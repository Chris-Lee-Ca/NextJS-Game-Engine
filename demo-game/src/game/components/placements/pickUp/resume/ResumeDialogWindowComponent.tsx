import { DialogWindowConfig } from "@/game/components/dialog/DialogWindowFactory";
import ActionButton from "@/game/components/template/ActionButton";
import CloseDialogButton from "@/game/components/template/CloseDialogButton";
import { Bio } from "@/game/lib/gameContent";
import { closeDialogWindow } from "@/game/redux/features/dialogSlice";
import { useAppDispatch } from "@/game/redux/hooks";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import TypeWriter from "game-engine/components/TypeWriter";

const Content = styled(Box)({
    width: "250px",
    fontWeight: "bold",
    textDecoration: "underline ",
});

const ResumeDialogContent: React.FC = () => {
    return (
        <>
            <Content>
                <TypeWriter content={"I discovered an attractive piece of paper on the ground."} />
            </Content>
        </>
    );
};

const ResumeDialogButtonGroup: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleOnClickReadIt = () => {
        window.open(Bio.resume, "_blank");
        dispatch(closeDialogWindow());
    };

    return (
        <>
            <ActionButton onClickFunction={handleOnClickReadIt} buttonKey={"k"} buttonDescription={"Read It"} />
            <CloseDialogButton/>
        </>
    );
};

const ResumeDialogWindowComponent: DialogWindowConfig = {
    imageSrc: require("../../../../assets/componentImage/paper.png").default.src,
    content: <ResumeDialogContent/>,
    buttonGroup: <ResumeDialogButtonGroup/>
}

export default  ResumeDialogWindowComponent;
