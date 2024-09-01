import { ReactNode } from "react";
import MainCharacter from "./mainCharacter";

interface CharacterFactoryProps {
    itemName: string;
}

const CharacterFactory = (props: CharacterFactoryProps): ReactNode => {
    const { itemName } = props;
    return <div />;
    // if (itemName === "main character") {
    //     return <MainCharacter />;
    // }
};

export default CharacterFactory;
