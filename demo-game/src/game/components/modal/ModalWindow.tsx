import styled from "@emotion/styled";
import { Box, Modal, keyframes } from "@mui/material";
import { ReactNode, useEffect } from "react";

import { CUSTOM_STYLE } from "@/game/lib/conts";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { closeModalWindow } from "@/game/redux/features/modalSlice";
import Image from "game-engine/components/Image";
import { setIsDisabledMainCharacterControl } from "game-engine/extensions/modules/MainCharacterDirectionControlModule";

const slideUp = keyframes`
  0% {
    transform: translateY(100%); /* Start out of the screen */
  }
  100% {
    transform: translateY(0); /* Final position */
  }
`;

const Wrapper = styled(Box)({
    height: "100vh",
    width: '100%',
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
});

const Container = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PAPER_COLOR,
    padding: "20px",
    outline: "none",
    borderRadius: "15px",
    animation: `${slideUp} 0.5s ease-out forwards`, //create slide in animation
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "500px",
});

const ImgWrapper = styled(Box)({
    width: "100%",
    maxWidth: "200px",
    height: "100%",
    maxHeight: '200px',
    paddingRight: "20px",
});

const ContentContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: '20px'
});

const ButtonContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    maxHeight: "50px",
});

interface ModalWindowPropsInterface {
    imageSrc: any;
    content: ReactNode;
    buttonGroup: ReactNode;
}

const ModalWindow = (props: ModalWindowPropsInterface) => {
    const { imageSrc, content, buttonGroup } = props;

    const modalState = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    const { isOpenModalWindow } = modalState;

    const handleClose = () => {
        dispatch(closeModalWindow());
    };

    useEffect(() => {
        dispatch(setIsDisabledMainCharacterControl(true));
        return () => {
            dispatch(setIsDisabledMainCharacterControl(false));
        };
    }, []);

    return (
        <>
            <Modal open={isOpenModalWindow} onClose={handleClose} closeAfterTransition>
                <Wrapper>
                    <Container>
                            <ImgWrapper>
                                <Image src={imageSrc} />
                            </ImgWrapper>
                            <ContentContainer>{content}</ContentContainer>
                            <ButtonContainer>{buttonGroup}</ButtonContainer>
                    </Container>
                </Wrapper>
            </Modal>
        </>
    );
};

export default ModalWindow;
