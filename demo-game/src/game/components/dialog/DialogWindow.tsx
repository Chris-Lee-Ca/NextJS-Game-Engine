import styled from "@emotion/styled";
import { Box, Grid, Modal, keyframes } from "@mui/material";
import { ReactNode, useEffect } from "react";

import { CUSTOM_STYLE } from "@/game/lib/conts";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { closeDialogWindow } from "@/game/redux/features/dialogSlice";
import Image from "game-engine/components/Image";
import { setIsDisabledMainCharacterControl } from "game-engine/extensions/modules/MainCharacterControlModule";

const slideUp = keyframes`
  0% {
    transform: translateY(100%); /* Start out of the screen */
  }
  100% {
    transform: translateY(0); /* Final position */
  }
`;

const ModalWrapper = styled(Box)({
    position: "absolute",
    bottom: 0,
    height: "200px",
    width: "100%",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PAPER_COLOR,
    padding: "20px",
    outline: "none",
    borderRadius: "5px 5px 0 0",
    animation: `${slideUp} 0.5s ease-out forwards`, //create slide in animation
});

const Container = styled(Grid)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
});

const LeftContainer = styled(Grid)({
    width: "100px",
    maxWidth: "20%",
});

const ImgWrapper = styled(Box)({
    width: "100%",
    maxWidth: "80%",
    height: "100%",
    paddingRight: "20px",
});

const RightContainer = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "160px",
});

const ContentContainer = styled(Grid)({});

const ButtonContainer = styled(Grid)({
    display: "flex",
    justifyContent: "space-between",
    maxHeight: "50px",
});

interface DialogWindowPropsInterface {
    imageSrc: any;
    content: ReactNode;
    buttonGroup: ReactNode;
}

const DialogWindow = (props: DialogWindowPropsInterface) => {
    const { imageSrc, content, buttonGroup } = props;

    const dialogState = useAppSelector((state) => state.dialog);
    const dispatch = useAppDispatch();

    const { isOpenDialogWindow } = dialogState;

    const handleClose = () => {
        dispatch(closeDialogWindow());
    };

    useEffect(() => {
        dispatch(setIsDisabledMainCharacterControl(true));
        return () => {
            dispatch(setIsDisabledMainCharacterControl(false));
        };
    }, []);

    return (
        <>
            <Modal open={isOpenDialogWindow} onClose={handleClose} closeAfterTransition>
                <ModalWrapper>
                    <Container container>
                        <LeftContainer item>
                            <ImgWrapper>
                                <Image src={imageSrc} />
                            </ImgWrapper>
                        </LeftContainer>
                        <RightContainer item>
                            <ContentContainer>{content}</ContentContainer>
                            <ButtonContainer>{buttonGroup}</ButtonContainer>
                        </RightContainer>
                    </Container>
                </ModalWrapper>
            </Modal>
        </>
    );
};

export default DialogWindow;
