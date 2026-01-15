import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para pruebas e2e de Icesi-Edutech
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './e2e',

    /* Ejecutar tests en archivos en paralelo */
    fullyParallel: true,

    /* Fallar la build en CI si dejaste test.only */
    forbidOnly: !!process.env.CI,

    /* Reintentar una vez en CI */
    retries: process.env.CI ? 2 : 0,

    /* Optar por no usar paralelización en CI */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter a usar */
    reporter: [
        ['html'],
        ['list'],
        ['json', { outputFile: 'playwright-report/results.json' }]
    ],

    /* Configuración compartida para todos los proyectos */
    use: {
        /* URL base para usar en acciones como `await page.goto('/')` */
        baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',

        /* Capturar trace solo cuando falle el test */
        trace: 'on-first-retry',

        /* Screenshots al fallar */
        screenshot: 'only-on-failure',

        /* Videos al fallar */
        video: 'retain-on-failure',

        /* Timeout para cada acción (click, fill, etc) */
        actionTimeout: 10000,
    },

    /* Configurar timeout global para cada test */
    timeout: 60000,

    /* Configurar timeout de navegación */
    expect: {
        timeout: 10000,
    },

    /* Configurar servidor dev local antes de tests */
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
        stdout: 'ignore',
        stderr: 'pipe',
    },

    /* Configurar proyectos para diferentes navegadores */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        /* Tests para mobile viewports */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },
    ],
});
