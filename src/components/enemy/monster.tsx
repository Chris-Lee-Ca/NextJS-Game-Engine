import { GameObject } from "@/types/general";
import React from "react";
import { Box, styled } from "@mui/material";
import { useState } from "react";

const MonsterBox = styled(Box)({
    position: "absolute",
});

interface MonsterProps {
    position: { x: number; y: number };
}
//   GameObject &
// const Monster:  React.FC<MonsterProps> = ({ position }) => {
//     const [x, setX] = useState(position);

//     const update = (deltaTime: number) => {
//         setX(prevX => prevX + deltaTime * 100); // Adjust speed with deltaTime
//     };

//     return (
//         <div style={{ left: x }}>Monster</div>
//     );
// }

class Monster extends React.Component implements GameObject {
    id: number;
    position: { x: number; y: number };

    constructor(props: MonsterProps) {
        super(props);
        this.id = 1;
        this.position = { x: 0, y: 0 };
    }

    update(deltaTime: number): void {
        console.log("calling update");
        this.position.x += 1;
    }

    render() {
        return (
            <MonsterBox style={{ left: this.position.x }}>Monster</MonsterBox>
        );
    }
}

export default Monster;
