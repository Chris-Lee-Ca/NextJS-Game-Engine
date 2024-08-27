"use client";

import { Box, styled } from "@mui/material";
import AnimatedSprite from "@/lib/AnimatedSprite";
import React, { useEffect, useState } from "react";
import { Animations } from "@/types/general";
import { SPRITE_SHEET, SPRITE_SHEET_SRC } from "@/lib/conts";
import { useAppSelector } from "@/redux/hooks";
import { animationSelector } from "@/lib/helper";

const CharacterBox = styled(Box)({
    zIndex: 99,
    position: "absolute",
});

interface CharacterSpriteSheet {
    width: number;
    height: number;
    frameWidth: number;
    frameHeight: number;
    frames: number;
    animationSpeed: number;
}

interface MainCharacterProps {}
const MainCharacter: React.FC<MainCharacterProps> = () => {
    const playerKeyboardEvent = useAppSelector((state) => state.player.playerKeyboardEvent);

    const animations: Animations = {
        idleDown: [[0, 0]],
        walkDown: [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        walkRight: [
            [1, 0],
            [1, 1],
            [1, 2],
            [1, 3],
        ],
        walkUp: [
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
        ],
        walkLeft: [
            [3, 0],
            [3, 1],
            [3, 2],
            [3, 3],
        ],
    };

    return (
        <CharacterBox>
            <AnimatedSprite
                imageSrc={SPRITE_SHEET_SRC}
                imageOffset={{
                    x: SPRITE_SHEET.CHARACTER_SECTION_X_OFFSET,
                    y: SPRITE_SHEET.CHARACTER_SECTION_Y_OFFSET,
                }}
                animations={animations}
                currentAnimation={animationSelector(playerKeyboardEvent)} //animationSelector(playerKeyboardEvent)
            />
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
