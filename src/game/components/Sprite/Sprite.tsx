"use client";

import { useEffect, useRef } from "react";
import { Offset, SpriteSheetInfo } from "@/game/types/general";
import SpriteHelper from "@/game/lib/helper/SpriteHelper";
import GridHelper from "@/game/lib/helper/GridHelper";

type SpriteProps = {
    spriteSheetInfo: SpriteSheetInfo;
    imageOffset?: Offset;
    scaleFactor: number;
};

const Sprite = (props: SpriteProps) => {
    const { spriteSheetInfo, scaleFactor } = props;
    const imageOffset = props.imageOffset ?? { x: 0, y: 0 };
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const imageRef = useRef<HTMLImageElement | null>(typeof window !== "undefined" ? new Image() : null);

    const frame = SpriteHelper.spritePositionToImagePosition(0, 0, spriteSheetInfo, imageOffset);

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

        context.clearRect(0, 0, canvas.width, canvas.height);

        image!.onload = () => {
            canvas.width = GridHelper.getGridActualSize();
            canvas.height = GridHelper.getGridActualSize();

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
        };
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default Sprite;
