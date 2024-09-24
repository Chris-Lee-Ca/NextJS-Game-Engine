import React, { CSSProperties } from "react";
import Rectangle from "game-engine/components/Rectangle";
import { Vector2 } from "game-engine/types/general";

interface BoundProps {
    position: Vector2;
    rectangle: Rectangle;
    color?: string; // Optional border color
}

// A component for use in dev mode, showing the component bound area
const Bound = ({ position, rectangle, color = "red" }: BoundProps) => {
    const { width, height } = rectangle;

    const style: CSSProperties = {
        position: "absolute",
        left: `${rectangle.x - position.x}px`,
        top: `${rectangle.y - position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        border: `2px solid ${color}`, // Set the border width and color
        boxSizing: "border-box", // Include the border in the dimensions
    };
    return <div style={style} />;
};

export default Bound;
