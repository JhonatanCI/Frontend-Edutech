import { Page, expect } from '@playwright/test';
import { routes, testUsers } from '../fixtures/test-data';

/**
 * Helpers para autenticación en tests e2e
 */

/**
 * Registra un nuevo usuario en la aplicación
 */
export async function registerUser(
    page: Page,
    userData: { username: string; email: string; password: string }
) {
    await page.goto(routes.register);

    // Completar formulario de registro
    await page.fill('[name="username"]', userData.username);
    await page.fill('[name="email"]', userData.email);
    await page.fill('[name="password"]', userData.password);

    // Enviar formulario
    await page.click('button[type="submit"]');
}

/**
 * Inicia sesión con un usuario existente
 */
export async function loginUser(
    page: Page,
    credentials: { email: string; password: string }
) {
    await page.goto(routes.login);

    // Completar formulario de login
    await page.fill('[name="email"]', credentials.email);
    await page.fill('[name="password"]', credentials.password);

    // Enviar formulario
    await page.click('button[type="submit"]');

    // Esperar redirección al home
    await page.waitForURL(routes.home, { timeout: 5000 });
}

/**
 * Verifica que el usuario esté autenticado
 */
export async function expectUserToBeAuthenticated(page: Page) {
    // Verificar que hay un token en localStorage
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
}

/**
 * Cierra sesión del usuario actual
 */
export async function logoutUser(page: Page) {
    // Buscar botón de logout (ajustar selector según implementación)
    const logoutButton = page.locator('button:has-text("Cerrar sesión"), button:has-text("Logout")');

    if (await logoutButton.isVisible()) {
        await logoutButton.click();
    } else {
        // Alternativa: limpiar localStorage
        await page.evaluate(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        });
    }

    await page.goto(routes.home);
}

/**
 * Setup: crea un usuario autenticado para tests que requieren login previo
 */
export async function setupAuthenticatedUser(page: Page) {
    const userData = testUsers.newUser;

    // Registrar usuario
    await registerUser(page, userData);

    // Esperar mensaje de éxito y limpiar
    await page.waitForTimeout(1000);

    // Hacer login
    await loginUser(page, { email: userData.email, password: userData.password });

    return userData;
}

/**
 * Limpia el estado de autenticación
 */
export async function cleanAuthState(page: Page) {
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
}
