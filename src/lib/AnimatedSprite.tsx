"use client";

import { useEffect, useRef } from "react";
import { SCALE_FACTOR, SPRITE_SHEET } from "./conts";
import { Animations, Offset } from "@/types/general";
import { spritePositionToImagePosition } from "./helper";

type AnimatedSpriteProps = {
    imageSrc: string;
    imageOffset?: Offset;
    animations: Animations;
    currentAnimation: string;
    frameDelay?: number;
};

const AnimatedSprite = (props: AnimatedSpriteProps) => {
    const { imageSrc, animations, currentAnimation, frameDelay = 15 } = props;
    const imageOffset = props.imageOffset ?? { x: 0, y: 0 };
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const imageRef = useRef<HTMLImageElement | null>(typeof window !== "undefined" ? new Image() : null);

    const animation = animations[currentAnimation].map((item) =>
        spritePositionToImagePosition(item[0], item[1], imageOffset)
    );

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

        let frameIndex = 0;
        let frameCount = 0;
        let animationFrameId: number;

        const animate = () => {
            if (frameCount % frameDelay === 0) {
                if (frameIndex === animation.length) {
                    frameIndex = 0;
                }
                const frame = animation[frameIndex];
                context.clearRect(0, 0, canvas.width, canvas.height);
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
                frameIndex += 1;
            }
            frameCount += 1;

            animationFrameId = requestAnimationFrame(animate);
        };

        image!.onload = () => {
            canvas.width = SPRITE_SHEET.WIDTH * SCALE_FACTOR;
            canvas.height = SPRITE_SHEET.HEIGHT * SCALE_FACTOR;
            animate();
        };

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [currentAnimation]);

    return <canvas ref={canvasRef}></canvas>;
};

export default AnimatedSprite;
