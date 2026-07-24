import { test, expect } from "@playwright/test";

test.describe("Autenticación", () => {
  test("un usuario nuevo puede registrarse y ve su sesión iniciada", async ({ page }) => {
    const email = `e2e-${Date.now()}@example.com`;

    await page.goto("/register");
    await page.getByLabel("Nombre").fill("Usuario E2E");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Contraseña").fill("password123");
    await page.getByRole("button", { name: "Crear cuenta" }).click();

    await expect(page).toHaveURL("/");
    // The user menu becomes visible (initials button) once logged in.
    await expect(page.getByRole("button", { name: "Abrir menú de usuario" })).toBeVisible();
  });

  test("credenciales inválidas muestran un error", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("no-existe@example.com");
    await page.getByLabel("Contraseña").fill("cualquiera");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await expect(page.getByText("Credenciales inválidas")).toBeVisible();
  });
});
