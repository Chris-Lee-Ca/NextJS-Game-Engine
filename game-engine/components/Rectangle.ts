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
    // public constructor(center: Vector2, width: number, height: number) {
    //     this.x = center.x - width / 2;
    //     this.y = center.y - height / 2;
    //     this.width = width;
    //     this.height = height;
    // }

    public getCenter(): Vector2 {
        return {
            x: (this.x + this.x + this.width) / 2,
            y: (this.y + this.y + this.height) / 2,
        };
    }

    public setCenter(center: Vector2): void {
        this.x = center.x - this.width / 2;
        this.y = center.y - this.height / 2;
    }

    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
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
