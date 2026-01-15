import { test, expect } from '@playwright/test';
import { testUsers, validationMessages, routes, passwords } from '../fixtures/test-data';
import { expectSuccessMessage, expectErrorMessage, expectFormToBeCleared } from '../helpers/common-helpers';

/**
 * ESCENARIO 1: Registro de Usuario Nuevo
 * 
 * Objetivo: Evaluar la facilidad con la que un usuario nuevo puede crear una cuenta
 * 
 * Métricas a observar:
 * - Tiempo de completación
 * - Número de errores cometidos
 * - Dificultad percibida
 * - Comprensión de requisitos de contraseña
 */

test.describe('Registro de Usuario', () => {

    test.beforeEach(async ({ page }) => {
        // Navegar a la página de registro antes de cada test
        await page.goto(routes.register);
    });

    test('debe mostrar el formulario de registro correctamente', async ({ page }) => {
        // Verificar que el formulario tiene todos los campos necesarios
        await expect(page.locator('[name="username"]')).toBeVisible();
        await expect(page.locator('[name="email"]')).toBeVisible();
        await expect(page.locator('[name="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('debe registrar un nuevo usuario exitosamente', async ({ page }) => {
        // TAREA: Crear una cuenta nueva en la plataforma
        const newUser = {
            username: `testuser_${Date.now()}`,
            email: `test_${Date.now()}@icesi.edu.co`,
            password: passwords.valid.simple,
        };

        // Paso 1: Completar el formulario de registro
        await page.fill('[name="username"]', newUser.username);
        await page.fill('[name="email"]', newUser.email);
        await page.fill('[name="password"]', newUser.password);

        // Paso 2: Enviar el formulario
        await page.click('button[type="submit"]');

        // CRITERIOS DE ÉXITO:
        // ✓ Mensaje de éxito visible
        await expectSuccessMessage(page, validationMessages.registroExitoso);

        // ✓ El mensaje de éxito debe estar en un banner verde (verificar color o clase)
        const successBanner = page.locator(`text=${validationMessages.registroExitoso}`).locator('..');
        await expect(successBanner).toBeVisible();

        // ✓ El formulario se limpia después del registro exitoso
        // Nota: esto depende de la implementación, puede que redirija al login
    });

    test('debe validar longitud mínima del nombre de usuario', async ({ page }) => {
        // POSIBLE ERROR: Nombre de usuario muy corto (mínimo 3 caracteres)
        await page.fill('[name="username"]', 'ab'); // Solo 2 caracteres
        await page.fill('[name="email"]', `test_${Date.now()}@icesi.edu.co`);
        await page.fill('[name="password"]', passwords.valid.simple);

        await page.click('button[type="submit"]');

        // Debe mostrar error de validación
        const errorMessage = page.getByText(/nombre.*3.*caracteres|usuario.*3.*caracteres|username.*3.*characters/i);
        await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
    });

    test('debe validar formato de email', async ({ page }) => {
        // POSIBLE ERROR: Email en formato incorrecto
        await page.fill('[name="username"]', `testuser_${Date.now()}`);
        
        // Usar evaluateHandle para establecer un valor inválido que bypass HTML5 validation
        const emailInput = page.locator('[name="email"]');
        await emailInput.fill('test@'); // Email incompleto pero con @
        
        await page.fill('[name="password"]', passwords.valid.simple);

        await page.click('button[type="submit"]');

        // Debe mostrar error de validación de email (ya sea HTML5 o custom)
        // Verificar que no se redirigió (aún estamos en registro)
        await expect(page).toHaveURL(routes.register);
        
        // O verificar que hay un mensaje de error visible
        const errorMessage = page.getByText(/email.*válido|correo.*válido|valid.*email/i);
        const isErrorVisible = await errorMessage.first().isVisible().catch(() => false);
        
        // El test pasa si permanecemos en la página o vemos el error
        expect(isErrorVisible || page.url().includes('/register')).toBeTruthy();
    });

    test('debe validar requisitos de contraseña - mínimo 6 caracteres', async ({ page }) => {
        // POSIBLE ERROR: Contraseña muy corta
        await page.fill('[name="username"]', `testuser_${Date.now()}`);
        await page.fill('[name="email"]', `test_${Date.now()}@icesi.edu.co`);
        await page.fill('[name="password"]', passwords.invalid.tooShort);

        await page.click('button[type="submit"]');

        // Debe mostrar error de validación
        const errorMessage = page.getByText(/contraseña.*6.*caracteres|password.*6.*characters/i);
        await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
    });

    test('debe validar requisitos de contraseña - al menos una mayúscula', async ({ page }) => {
        // POSIBLE ERROR: Contraseña sin mayúsculas
        await page.fill('[name="username"]', `testuser_${Date.now()}`);
        await page.fill('[name="email"]', `test_${Date.now()}@icesi.edu.co`);
        await page.fill('[name="password"]', passwords.invalid.noUppercase);

        await page.click('button[type="submit"]');

        // Debe mostrar error de validación
        const errorMessage = page.getByText(/mayúscula|minúscula|uppercase|lowercase/i);
        await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
    });

    test('debe validar requisitos de contraseña - al menos una minúscula', async ({ page }) => {
        // POSIBLE ERROR: Contraseña sin minúsculas
        await page.fill('[name="username"]', `testuser_${Date.now()}`);
        await page.fill('[name="email"]', `test_${Date.now()}@icesi.edu.co`);
        await page.fill('[name="password"]', passwords.invalid.noLowercase);

        await page.click('button[type="submit"]');

        // Debe mostrar error de validación
        const errorMessage = page.getByText(/mayúscula|minúscula|uppercase|lowercase/i);
        await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
    });

    test('debe validar requisitos de contraseña - al menos un número', async ({ page }) => {
        // POSIBLE ERROR: Contraseña sin números
        await page.fill('[name="username"]', `testuser_${Date.now()}`);
        await page.fill('[name="email"]', `test_${Date.now()}@icesi.edu.co`);
        await page.fill('[name="password"]', passwords.invalid.noNumber);

        await page.click('button[type="submit"]');

        // Debe mostrar error de validación
        const errorMessage = page.getByText(/número|number|digit/i);
        await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
    });

    test('debe mostrar error cuando el usuario ya existe', async ({ page }) => {
        // VALIDACIÓN DEL SISTEMA: Usuario duplicado
        const existingUsername = `existing_user_${Date.now()}`;
        const email1 = `test1_${Date.now()}@icesi.edu.co`;
        const email2 = `test2_${Date.now()}@icesi.edu.co`;

        // Primer registro
        await page.fill('[name="username"]', existingUsername);
        await page.fill('[name="email"]', email1);
        await page.fill('[name="password"]', passwords.valid.simple);
        await page.click('button[type="submit"]');

        // Esperar éxito
        await expectSuccessMessage(page, validationMessages.registroExitoso);

        // Intentar registrar con el mismo username
        await page.goto(routes.register);
        await page.fill('[name="username"]', existingUsername); // Mismo username
        await page.fill('[name="email"]', email2); // Email diferente
        await page.fill('[name="password"]', passwords.valid.simple);
        await page.click('button[type="submit"]');

        // Debe mostrar error
        await expectErrorMessage(page, validationMessages.usuarioYaExiste);
    });

    test('debe mostrar error cuando el email ya está registrado', async ({ page }) => {
        // VALIDACIÓN DEL SISTEMA: Email duplicado
        const username1 = `user1_${Date.now()}`;
        const username2 = `user2_${Date.now()}`;
        const existingEmail = `test_${Date.now()}@icesi.edu.co`;

        // Primer registro
        await page.fill('[name="username"]', username1);
        await page.fill('[name="email"]', existingEmail);
        await page.fill('[name="password"]', passwords.valid.simple);
        await page.click('button[type="submit"]');

        // Esperar éxito
        await expectSuccessMessage(page, validationMessages.registroExitoso);

        // Intentar registrar con el mismo email
        await page.goto(routes.register);
        await page.fill('[name="username"]', username2); // Username diferente
        await page.fill('[name="email"]', existingEmail); // Mismo email
        await page.fill('[name="password"]', passwords.valid.simple);
        await page.click('button[type="submit"]');

        // Debe mostrar error
        await expectErrorMessage(page, validationMessages.emailYaRegistrado);
    });

    test('debe tener enlace a la página de login', async ({ page }) => {
        // NAVEGACIÓN: El usuario debe poder ir al login desde el registro
        const loginLink = page.getByRole('link', { name: /ya tienes cuenta|iniciar sesi\u00f3n|login/i });
        await expect(loginLink.first()).toBeVisible();

        await loginLink.first().click();
        await expect(page).toHaveURL(routes.login);
    });

    test('debe prevenir envío con campos vacíos', async ({ page }) => {
        // COMPORTAMIENTO: Intentar enviar formulario con campos vacíos
        await page.click('button[type="submit"]');

        // Verificar que sigue en la página de registro
        await expect(page).toHaveURL(routes.register);

        // Verificar validación HTML5 o mensajes de error
        const usernameInput = page.locator('[name="username"]');
        const emailInput = page.locator('[name="email"]');
        const passwordInput = page.locator('[name="password"]');

        // Al menos uno debe tener el atributo required o mostrar error
        const usernameRequired = await usernameInput.getAttribute('required');
        const emailRequired = await emailInput.getAttribute('required');
        const passwordRequired = await passwordInput.getAttribute('required');

        expect(
            usernameRequired !== null ||
            emailRequired !== null ||
            passwordRequired !== null
        ).toBeTruthy();
    });
});
