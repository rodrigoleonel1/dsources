import { test, expect } from "@playwright/test";

async function registerAndLogin(page: import("@playwright/test").Page) {
  const email = `e2e-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
  await page.goto("/register");
  await page.getByLabel("Nombre").fill("Usuario E2E");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Contraseña").fill("password123");
  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await expect(page).toHaveURL("/");
}

test.describe("Envío de recursos y favoritos", () => {
  test("un usuario logueado puede enviar un recurso, que queda pendiente", async ({ page }) => {
    await registerAndLogin(page);

    await page.goto("/enviar");
    const suffix = Date.now();
    await page.getByLabel("Nombre del recurso").fill(`Recurso E2E ${suffix}`);
    await page.getByLabel("URL").fill(`https://example.com/e2e-${suffix}`);
    await page
      .getByLabel("Descripción breve")
      .fill("Un recurso de prueba creado por el test end-to-end.");
    await page.getByLabel("Escribí un tag y presioná Enter").fill("testing");
    await page.getByLabel("Escribí un tag y presioná Enter").press("Enter");
    await page.getByRole("button", { name: "Enviar para aprobación" }).click();

    await expect(page).toHaveURL("/mis-envios");
    await expect(page.getByText(`Recurso E2E ${suffix}`)).toBeVisible();
    await expect(page.getByText("Pendiente")).toBeVisible();
  });

  test("un usuario logueado puede marcar un recurso como favorito", async ({ page }) => {
    await registerAndLogin(page);

    await page.goto("/");
    const favoriteButton = page.getByRole("button", { name: /favoritos/i }).first();
    await favoriteButton.click();

    await page.goto("/favoritos");
    await expect(page.getByText(/recurso(s)? guardado/)).toBeVisible();
  });
});
