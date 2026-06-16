import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";
import signage2Image from "../../../../../assets/componentImage/signage2.png";


class Signage2ModalWindowBuilder extends ModalWindowBuilder {
    constructor() {
        super();
        this.imageSrc = signage2Image.src;
    }
}


export default Signage2ModalWindowBuilder;
