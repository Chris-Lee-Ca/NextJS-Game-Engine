import { memo, ComponentType } from "react";
import Rectangle from "../components/Rectangle";

class MemoHelper {
    static withValueEquality<P extends object>(Component: ComponentType<P>): ComponentType<P> {
        return memo(Component, MemoHelper.arePropsEqual) as unknown as ComponentType<P>;
    }

    private static arePropsEqual<P extends object>(prev: P, next: P): boolean {
        const keys = Object.keys(prev) as (keyof P)[];
        if (keys.length !== Object.keys(next).length) return false;
        return keys.every((key) => MemoHelper.valuesEqual(prev[key], next[key]));
    }

    private static valuesEqual(a: unknown, b: unknown): boolean {
        if (a instanceof Rectangle && b instanceof Rectangle) {
            return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
        }
        if (MemoHelper.isVector2Like(a) && MemoHelper.isVector2Like(b)) {
            return a.x === b.x && a.y === b.y;
        }
        return Object.is(a, b);
    }

    private static isVector2Like(value: unknown): value is { x: number; y: number } {
        if (typeof value !== "object" || value === null || value instanceof Rectangle) return false;
        const keys = Object.keys(value);
        return (
            keys.length === 2 &&
            typeof (value as Record<string, unknown>).x === "number" &&
            typeof (value as Record<string, unknown>).y === "number"
        );
    }
}

export default MemoHelper;
