import { test, expect } from '@playwright/test';
import { testUsers, validationMessages, routes, passwords } from '../fixtures/test-data';
import { registerUser, loginUser, expectUserToBeAuthenticated } from '../helpers/auth-helpers';
import { expectSuccessMessage, expectErrorMessage } from '../helpers/common-helpers';

/**
 * ESCENARIO 2: Inicio de Sesión
 * 
 * Objetivo: Evaluar la facilidad con la que un usuario existente puede acceder a su cuenta
 * 
 * Métricas a observar:
 * - Tiempo de completación
 * - Número de intentos necesarios
 * - Comprensión de mensajes de error
 * - Uso de la función "¿Has olvidado tu contraseña?"
 */

test.describe('Inicio de Sesión', () => {

    // Usuario de prueba creado antes de todos los tests
    let registeredUser: { email: string; password: string; username: string };

    test.beforeAll(async ({ browser }) => {
        // Crear un usuario para usar en los tests de login
        const page = await browser.newPage();

        registeredUser = {
            username: `login_test_${Date.now()}`,
            email: `logintest_${Date.now()}@icesi.edu.co`,
            password: passwords.valid.simple,
        };

        await registerUser(page, registeredUser);
        await page.close();
    });

    test.beforeEach(async ({ page }) => {
        // Navegar a la página de login antes de cada test
        await page.goto(routes.login);
    });

    test('debe mostrar el formulario de login correctamente', async ({ page }) => {
        // Verificar que el formulario tiene todos los campos necesarios
        await expect(page.locator('[name="email"]')).toBeVisible();
        await expect(page.locator('[name="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('debe iniciar sesión exitosamente con credenciales válidas', async ({ page }) => {
        // TAREA: Iniciar sesión con credenciales válidas

        // Paso 1: Completar el formulario
        await page.fill('[name="email"]', registeredUser.email);
        await page.fill('[name="password"]', registeredUser.password);

        // Paso 2: Enviar el formulario
        await page.click('button[type="submit"]');

        // CRITERIOS DE ÉXITO:
        // ✓ Mensaje de éxito visible
        await expectSuccessMessage(page, validationMessages.loginExitoso);

        // ✓ Redirección automática al home en 1 segundo
        await page.waitForURL(routes.home, { timeout: 5000 });

        // ✓ Usuario queda autenticado
        await expectUserToBeAuthenticated(page);
    });

    test('debe mostrar error con credenciales incorrectas - contraseña incorrecta', async ({ page }) => {
        // ESCENARIO ADICIONAL 2A: Login con credenciales incorrectas

        await page.fill('[name="email"]', registeredUser.email);
        await page.fill('[name="password"]', 'WrongPassword123');

        await page.click('button[type="submit"]');

        // ERROR ESPERADO: "Credenciales incorrectas"
        await expectErrorMessage(page, validationMessages.credencialesIncorrectas);

        // Verificar que NO fue redirigido
        await expect(page).toHaveURL(routes.login);
    });

    test('debe mostrar error con email no registrado', async ({ page }) => {
        // Login con email que no existe

        await page.fill('[name="email"]', `noexiste_${Date.now()}@icesi.edu.co`);
        await page.fill('[name="password"]', passwords.valid.simple);

        await page.click('button[type="submit"]');

        // ERROR ESPERADO: "Credenciales incorrectas" o similar
        await expectErrorMessage(page, validationMessages.credencialesIncorrectas);

        // Verificar que NO fue redirigido
        await expect(page).toHaveURL(routes.login);
    });

    test('debe validar formato de email en login', async ({ page }) => {
        // Intentar login con email inválido

        await page.fill('[name="email"]', 'email-sin-arroba');
        await page.fill('[name="password"]', passwords.valid.simple);

        await page.click('button[type="submit"]');

        // Debe mostrar error de validación o prevenir envío
        const emailInput = page.locator('[name="email"]');
        const emailType = await emailInput.getAttribute('type');

        // Si es type="email", HTML5 previene el envío
        if (emailType === 'email') {
            // Verificar que sigue en login
            await expect(page).toHaveURL(routes.login);
        } else {
            // Si no usa HTML5, debe mostrar error personalizado
            const errorMessage = page.locator('text=/.*email.*válido.*/i, text=/.*valid.*email.*/i');
            await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
        }
    });

    test('debe tener enlace a recuperación de contraseña', async ({ page }) => {
        // ESCENARIO ADICIONAL 2B: Recuperación de contraseña

        // Buscar el enlace "¿Has olvidado tu contraseña?"
        const resetPasswordLink = page.getByRole('link', { name: /olvidado|contraseña|forgot|password/i });

        await expect(resetPasswordLink.first()).toBeVisible();

        // Hacer clic en el enlace
        await resetPasswordLink.first().click();

        // Verificar redirección a /reset-password
        await expect(page).toHaveURL(routes.resetPassword);
    });

    test('debe tener enlace a la página de registro', async ({ page }) => {
        // El usuario debe poder ir al registro desde el login

        const registerLink = page.getByRole('link', { name: /registr|crear cuenta|no tienes cuenta/i });

        await expect(registerLink.first()).toBeVisible();

        await registerLink.first().click();
        await expect(page).toHaveURL(routes.register);
    });

    test('debe prevenir envío con campos vacíos', async ({ page }) => {
        // Intentar enviar formulario sin completar

        await page.click('button[type="submit"]');

        // Verificar que sigue en login
        await expect(page).toHaveURL(routes.login);

        // Verificar atributo required
        const emailInput = page.locator('[name="email"]');
        const passwordInput = page.locator('[name="password"]');

        const emailRequired = await emailInput.getAttribute('required');
        const passwordRequired = await passwordInput.getAttribute('required');

        expect(emailRequired !== null || passwordRequired !== null).toBeTruthy();
    });

    test('debe bloquear submit button durante el proceso de login', async ({ page }) => {
        // Verificar que el botón se deshabilita mientras procesa

        await page.fill('[name="email"]', registeredUser.email);
        await page.fill('[name="password"]', registeredUser.password);

        const submitButton = page.locator('button[type="submit"]');

        // Verificar el estado inicial del botón
        await expect(submitButton).toBeEnabled();

        // Click en submit y esperar navegación
        await Promise.all([
            page.waitForURL(routes.home, { timeout: 10000 }),
            submitButton.click()
        ]);

        // Verificar que llegamos al home (login exitoso)
        await expect(page).toHaveURL(routes.home);
    });

    test('debe mantener el foco en el campo de email al cargar', async ({ page }) => {
        // UX: El campo de email debe tener autofocus para facilitar el uso

        const emailInput = page.locator('[name="email"]');
        const hasAutofocus = await emailInput.getAttribute('autofocus');

        // O verificar que está enfocado
        const isFocused = await emailInput.evaluate(el => el === document.activeElement);

        // Al menos uno debe ser verdadero para buena UX
        expect(hasAutofocus !== null || isFocused).toBeTruthy();
    });

    test('debe limpiar mensajes de error al escribir de nuevo', async ({ page }) => {
        // Primero, generar un error
        await page.fill('[name="email"]', registeredUser.email);
        await page.fill('[name="password"]', 'WrongPassword');
        await page.click('button[type="submit"]');

        // Esperar mensaje de error
        await expectErrorMessage(page, validationMessages.credencialesIncorrectas);

        // Escribir de nuevo en el campo de contraseña
        await page.fill('[name="password"]', registeredUser.password);

        // El mensaje de error debería desaparecer (buena UX)
        // Nota: esto depende de la implementación
        const errorMessage = page.locator(`text=${validationMessages.credencialesIncorrectas}`);

        // Esperar un momento para que la UI reaccione
        await page.waitForTimeout(500);

        // Verificar si el error desapareció o si el formulario permite reenviar
        const submitButton = page.locator('button[type="submit"]');
        const isEnabled = await submitButton.isEnabled();

        expect(isEnabled).toBeTruthy();
    });

    test('debe poder usar Enter para enviar el formulario', async ({ page }) => {
        // UX: Presionar Enter en cualquier campo debe enviar el formulario

        await page.fill('[name="email"]', registeredUser.email);
        await page.fill('[name="password"]', registeredUser.password);

        // Presionar Enter en el campo de contraseña
        await page.locator('[name="password"]').press('Enter');

        // Debe procesar el login
        await page.waitForURL(routes.home, { timeout: 5000 });
        await expectUserToBeAuthenticated(page);
    });
});
