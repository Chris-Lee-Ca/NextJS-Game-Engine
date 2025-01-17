import { Vector2 } from "../types/general";

class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;

    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    public getCenter(): Vector2 {
        return {
            x: (this.x + this.x + this.width) / 2,
            y: (this.y + this.y + this.height) / 2,
        };
    }

    public setCenter(center: Vector2): Rectangle {
        this.x = center.x - this.width / 2;
        this.y = center.y - this.height / 2;
        return this;
    }

    public setPosition(x: number, y: number): Rectangle {
        this.x = x;
        this.y = y;
        return this;
    }

    public contains(rect: Rectangle): boolean {
        return (
            this.x <= rect.x &&
            this.y <= rect.y &&
            this.x + this.width >= rect.x + rect.width &&
            this.y + this.height >= rect.y + rect.height
        );
    }

    public overlaps(rect: Rectangle): boolean {
        return !(
            this.x + this.width <= rect.x ||
            this.y + this.height <= rect.y ||
            this.x >= rect.x + rect.width ||
            this.y >= rect.y + rect.height
        );
    }
}

export default Rectangle;
