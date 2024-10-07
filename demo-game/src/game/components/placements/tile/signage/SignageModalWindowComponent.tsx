import { ModalWindowConfig } from "@/game/components/modal/ModalWindowFactory";
import CloseActionButton from "@/game/components/template/CloseActionButton";
import CloseModalButton from "@/game/components/template/CloseModalButton";
import { Box, styled } from "@mui/material";

const Title = styled(Box)({
    fontWeight: 'bolder',
    fontSize: '30px',
    marginBottom: '20px'
})

const Content = styled(Box)({
    width: '100%',
    fontWeight: 'bold',
    textDecoration: 'underline',
    textAlign: 'center',
    marginBottom: '5px'
})

const Span = styled('span')({
})

const SignageDialogContent: React.FC = () => {
    return (
        <>
            <Title>About this World</Title>
            <Content>This world is created by <Span>TypeScript</Span>, <Span>React JS</Span> and <Span>Material UI</Span>.</Content>
            <Content>Memories from <Span>Sanity (headless CMS) </Span>are scattered across the world.</Content>
            <Content>Try to capture them.</Content>
        </>
    );
};

const SignageDialogButtonGroup: React.FC = () => {
    return (
        <>
            <CloseModalButton />
        </>
    );
};


const SignageModalWindowComponent: ModalWindowConfig = {
    imageSrc: require("../../../../assets/componentImage/signage.png").default.src,
    content: <SignageDialogContent/>,
    buttonGroup: <SignageDialogButtonGroup/>
}

export default  SignageModalWindowComponent;