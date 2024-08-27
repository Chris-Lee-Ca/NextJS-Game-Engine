"use client";

import { useEffect, useRef } from "react";
import { SCALE_FACTOR, SPRITE_SHEET } from "./conts";
import { spritePositionToImagePosition } from "./helper";
import { Offset } from "@/types/general";

type SpriteProps = {
    imageSrc: string;
    imageOffset?: Offset;
};

const Sprite = (props: SpriteProps) => {
    const { imageSrc } = props;
    const imageOffset = props.imageOffset ?? { x: 0, y: 0 };
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const imageRef = useRef<HTMLImageElement | null>(typeof window !== "undefined" ? new Image() : null);

    const frame = spritePositionToImagePosition(0, 0, imageOffset);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        const image = imageRef.current;
        if (image) {
            image.src = imageSrc;
            image.crossOrigin = "anonymous";
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        image!.onload = () => {
            canvas.width = SPRITE_SHEET.WIDTH * SCALE_FACTOR;
            canvas.height = SPRITE_SHEET.HEIGHT * SCALE_FACTOR;
            context.drawImage(
                image!,
                frame.x,
                frame.y,
                SPRITE_SHEET.WIDTH,
                SPRITE_SHEET.HEIGHT,
                0,
                0,
                SPRITE_SHEET.WIDTH * SCALE_FACTOR, // Scaled width
                SPRITE_SHEET.HEIGHT * SCALE_FACTOR // Scaled height
            );
        };
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default Sprite;
