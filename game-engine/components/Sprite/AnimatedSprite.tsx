"use client";

import { useEffect, useRef } from "react";
import { Animations, Offset, SpriteSheetInfo } from "../../types/general";
import SpriteHelper from "../../helper/SpriteHelper";
import GridHelper from "../../helper/GridHelper";

type AnimatedSpriteProps = {
    spriteSheetInfo: SpriteSheetInfo;
    imageOffset?: Offset;
    scaleFactor: number;
    animations: Animations;
    currentAnimation: string;
    frameDelay?: number;
};

const AnimatedSprite = (props: AnimatedSpriteProps) => {
    const { spriteSheetInfo, scaleFactor, animations, currentAnimation, frameDelay = 15 } = props;
    const imageOffset = props.imageOffset ?? { x: 0, y: 0 };
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const imageRef = useRef<HTMLImageElement | null>(typeof window !== "undefined" ? new Image() : null);

    const animation = animations[currentAnimation].map((item) =>
        SpriteHelper.spritePositionToImagePosition(item[0], item[1], spriteSheetInfo, imageOffset)
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        const image = imageRef.current;
        if (image) {
            image.src = spriteSheetInfo.SRC;
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
                    spriteSheetInfo.WIDTH,
                    spriteSheetInfo.HEIGHT,
                    0,
                    0,
                    spriteSheetInfo.WIDTH * scaleFactor, // Scaled width
                    spriteSheetInfo.HEIGHT * scaleFactor // Scaled height
                );
                frameIndex += 1;
            }
            frameCount += 1;

            animationFrameId = requestAnimationFrame(animate);
        };

        image!.onload = () => {
            canvas.width = GridHelper.getGridSizeInPixel();
            canvas.height = GridHelper.getGridSizeInPixel();
            animate();
        };

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [currentAnimation]);

    return <canvas ref={canvasRef}></canvas>;
};

export default AnimatedSprite;
