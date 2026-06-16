import DialogWindowBuilder from "@/game/components/dialog/DialogWindowBuilder";
import { DialogWindowConfig } from "@/game/components/dialog/DialogWindowFactory";
import { DialogContent } from "@/game/components/styled";
import TypeWriter from "./TypeWriter";
import heroImage from "../assets/componentImage/hero.png";

const IntroDialogContent: React.FC = () => {
    return (
        <>
            <DialogContent>
                <TypeWriter content={"Who am I ?"} />
            </DialogContent>
        </>
    );
};

const IntroDialogWindowComponent: DialogWindowConfig = new DialogWindowBuilder()
    .setImageSrc(heroImage.src)
    .setContent(IntroDialogContent)
    .build();

export default IntroDialogWindowComponent;
