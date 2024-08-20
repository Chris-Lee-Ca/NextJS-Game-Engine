"use client";
import { GameObject } from "@/lib/types";
import { useAppSelector } from "@/redux/hooks";
import { Box, styled } from "@mui/material";
import React from "react";
import { useState } from "react";

interface MainCharacterProps {}

const CharacterBox = styled(Box)({
    position: "absolute",
});

const MainCharacter: React.FC<MainCharacterProps> = () => {
    //todo: don't directly use app selector to retrieve value. Instead, use the update method to get value and update it
    const playerPosition = useAppSelector(
        (state) => state.player.playerPosition
    );
    // const update = (): void => {
    //     this.position.x += 1;
    // }
    return (
        <CharacterBox style={{ left: playerPosition.x, top: playerPosition.y }}>
            Main Character
        </CharacterBox>
    );
};

// class MainCharacter extends React.Component implements GameObject {
//     playerPosition = useAppSelector((state) => state.player.playerPosition);

//     id: number;
//     position: { x: number; y: number };

//     constructor(props: MainCharacterProps) {
//         super(props);
//         this.id = 1;
//         this.position = { x: 0, y: 0 };
//         this.state = {
//             position: { x: 0, y: 0 },
//         };
//     }

//     // componentDidUpdate(prevProps: MainCharacterProps) {
//     //     const { newPosition } = this.props;
//     //     const { currentPosition } = this.state;

//     //     if (newPosition !== prevProps.newPosition) {
//     //         this.setState({ position: newPosition });
//     //     }
//     // }

//     update(deltaTime: number): void {
//         this.position.x += 1;
//     }

//     render() {
//         return (
//             <div style={{ left: this.position.x, top: this.position.y }}>
//                 Main Character
//             </div>
//         );
//     }
// }

export default MainCharacter;
