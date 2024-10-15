import { FC, ReactNode } from "react";
import { RoadType } from "@/game/types/placement";
import { Facing } from "game-engine/extensions/modules/MainCharacterDirectionControlModule";
import {
    StraightRoadComponent,
    DeadEndRoadComponent,
    TJunctionRoadComponent,
    TurnRoadComponent,
    XJunctionRoadComponent,
} from "./RoadComponent";
import RoadComponentWrapper from "./RoadComponentWrapper";

const roadComponents: Record<RoadType, FC> = {
    straight: StraightRoadComponent,
    "dead-end": DeadEndRoadComponent,
    "t-junction": TJunctionRoadComponent,
    turn: TurnRoadComponent,
    "x-junction": XJunctionRoadComponent,
};

interface RoadComponentFactoryProps {
    roadType: RoadType;
    facing: Facing;
}

const RoadComponentFactory = (props: RoadComponentFactoryProps) => {
    const { roadType, facing } = props;

    const roadInterface = roadComponents[roadType];

    if (!roadInterface) {
        throw new Error(`Unknown road type: ${roadType}`);
    }
    const renderComponent = (Component: FC): ReactNode => {
        return <Component />;
    };

    return <RoadComponentWrapper facing={facing} roadInterface={renderComponent(roadInterface)} />;
};

export default RoadComponentFactory;
