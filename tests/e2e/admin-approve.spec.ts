import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD;

test.describe("Aprobación de recursos (admin)", () => {
  test.skip(
    !ADMIN_EMAIL || !ADMIN_PASSWORD,
    "Definí E2E_ADMIN_EMAIL y E2E_ADMIN_PASSWORD para correr este test (usá el mismo admin creado con `npm run seed`)."
  );

  test("un admin puede ver y aprobar un recurso pendiente", async ({ page }) => {
    // 1. Un usuario nuevo envía un recurso.
    const email = `e2e-${Date.now()}@example.com`;
    await page.goto("/register");
    await page.getByLabel("Nombre").fill("Usuario E2E");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Contraseña").fill("password123");
    await page.getByRole("button", { name: "Crear cuenta" }).click();
    await expect(page).toHaveURL("/");

    const suffix = Date.now();
    const resourceName = `Recurso Admin E2E ${suffix}`;
    await page.goto("/enviar");
    await page.getByLabel("Nombre del recurso").fill(resourceName);
    await page.getByLabel("URL").fill(`https://example.com/admin-e2e-${suffix}`);
    await page
      .getByLabel("Descripción breve")
      .fill("Recurso de prueba para el flujo de aprobación admin.");
    await page.getByLabel("Escribí un tag y presioná Enter").fill("testing");
    await page.getByLabel("Escribí un tag y presioná Enter").press("Enter");
    await page.getByRole("button", { name: "Enviar para aprobación" }).click();
    await expect(page).toHaveURL("/mis-envios");

    // 2. Cerramos sesión e ingresamos como admin.
    await page.getByRole("button", { name: "Abrir menú de usuario" }).click();
    await page.getByRole("menuitem", { name: /Cerrar sesión/i }).click();

    await page.goto("/login");
    await page.getByLabel("Email").fill(ADMIN_EMAIL!);
    await page.getByLabel("Contraseña").fill(ADMIN_PASSWORD!);
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    // 3. Aprobamos el recurso recién enviado.
    await page.goto("/admin/pendientes");
    const card = page.locator("text=" + resourceName).locator("..").locator("..");
    await card.getByRole("button", { name: "Aprobar" }).click();

    await expect(page.getByText(resourceName)).not.toBeVisible();
  });
});
