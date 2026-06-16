import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";
import signageImage from "../../../../../assets/componentImage/signage.png";


class SignageModalWindowBuilder extends ModalWindowBuilder {
    constructor() {
        super();
        this.imageSrc = signageImage.src;
    }
}


export default SignageModalWindowBuilder;
