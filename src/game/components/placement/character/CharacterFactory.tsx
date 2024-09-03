import { ReactNode } from "react";
import MainCharacter from "./mainCharacter";

interface CharacterFactoryProps {
    itemName: string;
}

const CharacterFactory = (props: CharacterFactoryProps): ReactNode => {
    const { itemName } = props;
    // if (itemName === "main character") {
    //     return <MainCharacter />;
    // }
    return <div />;
};

export default CharacterFactory;
