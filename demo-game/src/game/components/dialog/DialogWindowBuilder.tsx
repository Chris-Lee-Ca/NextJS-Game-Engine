import { FC, ReactNode } from "react";
import CloseDialogButton from "../template/CloseDialogButton";
import { DialogWindowConfig } from "./DialogWindowFactory";

const DefaulButtonGroup: FC = () => {
    return (
        <>
            <CloseDialogButton />
        </>
    );
};

class DialogWindowBuilder {
    protected imageSrc: string = '';
    protected content!: FC;
    protected buttonGroup: FC = DefaulButtonGroup;

    // Helper method to convert FC to ReactNode
    private renderComponent(Component: FC): ReactNode {
        return <Component />;
    }

    setImageSrc(imageSrc: string): this {
        this.imageSrc = imageSrc;
        return this;
    }

    setContent(content: FC): this {
        this.content = content;
        return this;
    }

    setButtonGroup(buttonGroup: FC): this {
        this.buttonGroup = buttonGroup;
        return this;
    }

    build(): DialogWindowConfig {
        if (!this.imageSrc) {
            throw new Error("ImageSrc is required.");
        }
        if (!this.content) {
            throw new Error("Content is required.");
        }

        return {
            imageSrc: this.imageSrc,
            content: this.renderComponent(this.content),
            buttonGroup: this.renderComponent(this.buttonGroup),
        };
    }
}

export default DialogWindowBuilder;