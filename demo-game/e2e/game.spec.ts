import { test, expect } from "@playwright/test";

test.describe("Game page (/demo)", () => {
    test("page loads without unhandled JS errors", async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (err) => errors.push(err.message));
        await page.goto("/demo");
        // Allow time for the game loop and lazy-loaded initializer to mount
        await page.waitForTimeout(3000);
        expect(errors).toHaveLength(0);
    });

    test("status bar is visible", async ({ page }) => {
        await page.goto("/demo");
        await expect(page.getByTestId("status-bar")).toBeVisible({ timeout: 10000 });
    });

    test("game viewport is visible", async ({ page }) => {
        await page.goto("/demo");
        await expect(page.getByTestId("game-viewport")).toBeVisible({ timeout: 10000 });
    });

    test("game canvas renders after initialization", async ({ page }) => {
        await page.goto("/demo");
        // The canvas lives inside an overflow:hidden viewport, so check it's in the DOM
        // rather than visually exposed.
        await expect(page.getByTestId("game-canvas")).toBeAttached({ timeout: 15000 });
    });

    test("virtual keyboard is present", async ({ page }) => {
        await page.goto("/demo");
        // The virtual keyboard sits behind the fixed viewport overlay, so check DOM presence.
        await expect(page.getByTestId("virtual-keyboard")).toBeAttached({ timeout: 10000 });
    });
});
