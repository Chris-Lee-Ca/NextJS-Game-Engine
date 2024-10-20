import DialogWindowBuilder from "@/game/components/dialog/DialogWindowBuilder";
import { DialogWindowConfig } from "@/game/components/dialog/DialogWindowFactory";
import { DialogContent } from "@/game/components/styled";
import TypeWriter from "./TypeWriter";

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
    .setImageSrc(require("../assets/componentImage/hero.png").default.src)
    .setContent(IntroDialogContent)
    .build();

export default IntroDialogWindowComponent;
