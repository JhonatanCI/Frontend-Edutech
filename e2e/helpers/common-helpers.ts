import { Page, expect } from '@playwright/test';

/**
 * Helpers comunes para tests e2e
 */

/**
 * Espera a que un elemento sea visible con timeout personalizado
 */
export async function waitForElement(
    page: Page,
    selector: string,
    options?: { timeout?: number; state?: 'visible' | 'hidden' | 'attached' }
) {
    await page.waitForSelector(selector, {
        timeout: options?.timeout || 10000,
        state: options?.state || 'visible',
    });
}

/**
 * Verifica que un mensaje de éxito esté visible
 */
export async function expectSuccessMessage(page: Page, message: string) {
    const successBanner = page.locator(`text=${message}`);
    await expect(successBanner).toBeVisible({ timeout: 5000 });
}

/**
 * Verifica que un mensaje de error esté visible
 */
export async function expectErrorMessage(page: Page, message: string) {
    const errorMessage = page.locator(`text=${message}`);
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
}

/**
 * Espera a que la navegación se complete
 */
export async function waitForNavigation(page: Page, url: string) {
    await page.waitForURL(url, { timeout: 5000 });
}

/**
 * Verifica que un formulario esté vacío
 */
export async function expectFormToBeCleared(page: Page, formSelector: string) {
    const inputs = page.locator(`${formSelector} input[type="text"], ${formSelector} input[type="email"], ${formSelector} input[type="password"]`);
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toBe('');
    }
}

/**
 * Espera a que un loader/spinner desaparezca
 */
export async function waitForLoadingToComplete(page: Page) {
    // Esperar a que desaparezcan spinners comunes
    const spinnerSelectors = [
        '[data-testid="loading"]',
        '.spinner',
        '.loading',
        'text=Cargando',
        'text=Loading',
    ];

    for (const selector of spinnerSelectors) {
        const spinner = page.locator(selector);
        if (await spinner.isVisible({ timeout: 1000 }).catch(() => false)) {
            await spinner.waitFor({ state: 'hidden', timeout: 10000 });
        }
    }
}

/**
 * Llena un formulario con datos
 */
export async function fillForm(page: Page, formData: Record<string, string>) {
    for (const [fieldName, value] of Object.entries(formData)) {
        await page.fill(`[name="${fieldName}"]`, value);
    }
}

/**
 * Hace scroll a un elemento
 */
export async function scrollToElement(page: Page, selector: string) {
    await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Toma una captura de pantalla con nombre descriptivo
 */
export async function takeScreenshot(page: Page, name: string) {
    await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
}

/**
 * Verifica que un botón esté deshabilitado
 */
export async function expectButtonToBeDisabled(page: Page, selector: string) {
    const button = page.locator(selector).first();
    await expect(button).toBeDisabled({ timeout: 5000 });
}

/**
 * Verifica que un botón esté habilitado
 */
export async function expectButtonToBeEnabled(page: Page, selector: string) {
    const button = page.locator(selector).first();
    await expect(button).toBeEnabled({ timeout: 5000 });
}

/**
 * Espera a que un modal o diálogo se abra
 */
export async function waitForModalToOpen(page: Page) {
    const modal = page.locator('[role="dialog"], [data-testid*="modal"], .modal');
    await expect(modal.first()).toBeVisible({ timeout: 5000 });
}

/**
 * Espera a que un modal o diálogo se cierre
 */
export async function waitForModalToClose(page: Page) {
    const modal = page.locator('[role="dialog"], [data-testid*="modal"], .modal');
    await expect(modal.first()).not.toBeVisible({ timeout: 5000 });
}

/**
 * Busca un elemento por texto usando expresiones regulares
 */
export async function findByTextRegex(page: Page, pattern: RegExp) {
    return page.locator(`text=${pattern}`);
}

/**
 * Verifica que un elemento tenga una clase CSS específica
 */
export async function expectToHaveClass(page: Page, selector: string, className: string) {
    const element = page.locator(selector);
    const classes = await element.getAttribute('class');
    expect(classes).toContain(className);
}

/**
 * Espera un tiempo determinado (usar con precaución)
 */
export async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Navega al primer programa disponible desde el home
 * Busca las tarjetas de programas en la sección "Conoce nuestros programas"
 */
export async function navigateToProgramFromHome(page: Page) {
    // Esperar a que la sección de programas esté visible
    await page.waitForSelector('#programas', { timeout: 10000 });
    
    // Esperar a que se carguen los programas
    await waitForLoadingToComplete(page);
    
    // Buscar el botón "Saber más" dentro de las tarjetas de programas
    const programButtons = page.locator('#programas button:has-text("Saber más")');
    
    // Esperar a que al menos un botón esté visible
    await expect(programButtons.first()).toBeVisible({ timeout: 10000 });
    
    // Click en el primer programa
    await programButtons.first().click();
    
    // Esperar a que la navegación se complete
    await page.waitForURL(/\/program\/.+/, { timeout: 10000 });
    
    // Esperar a que termine de cargar
    await waitForLoadingToComplete(page);
}
