import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
    test("renders title and demo link", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("heading", { name: "Next JS Game Engine" })).toBeVisible();
        await expect(page.getByRole("link", { name: /Demo/i })).toBeVisible();
    });

    test("navigates to /demo when Demo link is clicked", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: /Demo/i }).click();
        await expect(page).toHaveURL("/demo");
    });

    test("no unhandled JS errors on load", async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (err) => errors.push(err.message));
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        expect(errors).toHaveLength(0);
    });
});
