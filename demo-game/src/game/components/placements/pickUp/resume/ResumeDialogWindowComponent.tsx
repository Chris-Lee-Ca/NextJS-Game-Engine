import ActionButton from "@/game/components/template/ActionButton";
import CloseActionButton from "@/game/components/template/CloseActionButton";
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
            <ActionButton onClickFunction={handleOnClickReadIt} buttonKey={"L"} buttonDescription={"Read It"} />
            <CloseActionButton />
        </>
    );
};

export { ResumeDialogContent, ResumeDialogButtonGroup };
