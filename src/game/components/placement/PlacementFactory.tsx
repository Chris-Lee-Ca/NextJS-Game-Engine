import { Placement } from "@/game/types/general";
import CharacterFactory from "./character/CharacterFactory";
import TileFactory from "../tile/TileFactory";
import { ReactNode } from "react";

type PlacementFactoryProps = { placement: Placement };

const PlacementFactory = (props: PlacementFactoryProps): ReactNode => {
    const { placement } = props;
    switch (placement.type) {
        case "Character":
            return <CharacterFactory itemName={placement.itemName} />;
        case "Enemy":
            return;
        case "PickUp":
            return;
        case "Tile":
            return <TileFactory itemName={placement.itemName} />;
        default:
            const placementType: never = placement.type;
            throw new Error(`Unknown placement type ${placementType}`);
    }
};

export default PlacementFactory;
