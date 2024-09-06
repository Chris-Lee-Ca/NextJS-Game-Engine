"use client";

import { useState, useEffect } from "react";
import { GRID } from "../lib/conts";
import GridHelper from "../lib/helper/GridHelper";

// Custom hook to use a CSS variable
export const useCSSVariable = (variableName: string): number => {
    const [value, setValue] = useState<number>(GridHelper.getScaleFactor());

    const debounce = (func: () => void, delay: number) => {
        let timeoutId: any = null;
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(func, delay);
        };
    };

    useEffect(() => {
        // Update the value if the CSS variable changes
        const handleResize = () => {
            setValue(GridHelper.getScaleFactor());
        };

        // slightly delay the retrieval of the CSS custom property until after the styles have been applied
        setTimeout(handleResize, 0);

        // Debounce the resize event listener to minimize state updates.
        const debouncedResize = debounce(handleResize, 100);

        // Add event listener for resize or other triggers if needed
        window.addEventListener("resize", debouncedResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", debouncedResize);
        };
    }, [variableName]);

    return value;
};
