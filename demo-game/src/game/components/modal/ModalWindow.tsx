import styled from "@emotion/styled";
import { Box, Modal, keyframes } from "@mui/material";
import { ReactNode, useEffect, useRef } from "react";

import { CUSTOM_STYLE } from "@/game/lib/conts";
import { useAppDispatch, useAppSelector } from "@/game/redux/hooks";
import { closeModalWindow } from "@/game/redux/features/modalSlice";
import Image from "game-engine/components/Image";
import {
    MAIN_CHARACTER_DIRECTION_CONTROL_MODULE_ID,
    setIsDisabledMainCharacterControl,
} from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import { KEYBOARD_EVENT_PLUGIN_ID } from "game-engine/extensions/plugins/keyboardEventPlugin";

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
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const Container = styled(Box)({
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_PAPER_COLOR,
    padding: "20px",
    outline: "none",
    borderRadius: "15px",
    animation: `${slideUp} 0.5s ease-out forwards`, //create slide in animation

    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "auto",
});

const InnerContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

const ImgWrapper = styled(Box)({
    width: "100%",
    maxWidth: "200px",
    height: "15vh",
    maxHeight: "200px",
    backgroundColor: CUSTOM_STYLE.COLOR.MAIN_WHITE,
    border: `3px solid ${CUSTOM_STYLE.COLOR.MAIN_BLACK}`,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
});

const ContentContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
    backgroundColor: CUSTOM_STYLE.COLOR.SECONDARY_PAPER_COLOR,
    borderRadius: "10px",
    padding: "20px",
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

    const keyBoardEventState = useAppSelector((state) => state[KEYBOARD_EVENT_PLUGIN_ID]);
    const modalState = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            if (keyBoardEventState.heldKeys.some((key) => ["ArrowDown", "s"].includes(key))) {
                container.scrollBy({ top: 50, behavior: "smooth" });
            } else if (keyBoardEventState.heldKeys.some((key) => ["ArrowUp", "w"].includes(key))) {
                container.scrollBy({ top: -50, behavior: "smooth" });
            }
        }
    }, [keyBoardEventState.heldKeys]);

    return (
        <>
            <Modal open={isOpenModalWindow} onClose={handleClose} closeAfterTransition>
                <Wrapper>
                    <Container ref={containerRef}>
                        <InnerContainer>
                            <ImgWrapper>
                                <Image src={imageSrc} style={{ objectFit: "contain" }} />
                            </ImgWrapper>
                            <ContentContainer>{content}</ContentContainer>
                            <ButtonContainer>{buttonGroup}</ButtonContainer>
                        </InnerContainer>
                    </Container>
                </Wrapper>
            </Modal>
        </>
    );
};

export default ModalWindow;
