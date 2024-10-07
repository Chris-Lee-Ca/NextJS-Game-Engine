import ModalWindowBuilder from "@/game/components/modal/ModalWindowBuilder";


class SignageModalWindowBuilder extends ModalWindowBuilder {
    constructor() {
        super();
        this.imageSrc = require("../../../../../assets/componentImage/signage.png").default.src;
    }
}


export default SignageModalWindowBuilder;
