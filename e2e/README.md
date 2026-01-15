# Pruebas End-to-End (E2E) con Playwright

Este directorio contiene las pruebas end-to-end (e2e) para **Icesi-Edutech** usando **Playwright**.

## 📁 Estructura del Directorio

```
e2e/
├── auth/
│   ├── registro.spec.ts       # ✅ Pruebas de registro de usuario (12 tests)
│   └── login.spec.ts           # ✅ Pruebas de inicio de sesión (10 tests)
├── courses/
│   └── intercambio.spec.ts     # ✅ Pruebas de intercambio de cursos (10 tests)
├── presets/
│   └── presets.spec.ts         # ✅ Pruebas de configuraciones preestablecidas (11 tests)
├── fixtures/
│   └── test-data.ts            # ✅ Datos de prueba centralizados y actualizados
└── helpers/
    ├── auth-helpers.ts         # ✅ Funciones helper para autenticación (6 funciones)
    └── common-helpers.ts       # ✅ Funciones helper comunes (12+ funciones)

Total: 43 tests E2E completados
```

## 🎯 Escenarios de Prueba

Las pruebas están basadas en el **Libreto de Pruebas de Usabilidad** (`LIBRETO_PRUEBAS_USABILIDAD.md`) y cubren:

### 1. **Registro de Usuario** (`auth/registro.spec.ts`)
- ✅ Registro exitoso con datos válidos
- ✅ Validación de campos (username, email, password)
- ✅ Mensajes de error claros
- ✅ Requisitos de contraseña (mayúscula, minúscula, número, longitud)
- ✅ Manejo de usuarios/emails duplicados
- ✅ Navegación entre registro y login

### 2. **Inicio de Sesión** (`auth/login.spec.ts`)
- ✅ Login exitoso con credenciales válidas
- ✅ Manejo de credenciales incorrectas
- ✅ Validación de formato de email
- ✅ Redirección automática después del login
- ✅ Enlace a recuperación de contraseña
- ✅ UX mejorada (autofocus, submit con Enter)

### 3. **Intercambio de Cursos** (`courses/intercambio.spec.ts`)
- ✅ Navegación a programas
- ✅ Visualización de cursos del programa
- ✅ Apertura de modal de intercambio
- ✅ Listado de cursos compatibles
- ✅ Barra de búsqueda de cursos
- ✅ Selección de curso nuevo
- ✅ Comparación curso actual vs nuevo
- ✅ Confirmación de intercambio
- ✅ Cancelación sin cambios

### 4. **Configuraciones Preestablecidas** (`presets/presets.spec.ts`)
- ✅ Visualización del selector de presets
- ✅ Apertura del menú desplegable
- ✅ Listado de presets disponibles
- ✅ Información de cada preset (nombre, descripción, cantidad de cursos)
- ✅ Selección de preset
- ✅ Cambio de cursos al aplicar preset
- ✅ Alternancia entre presets
- ✅ Retorno a "Sin configuración predeterminada"

## 🚀 Comandos Disponibles

### Ejecutar todas las pruebas e2e
```bash
npm run test:e2e
```

### Ejecutar pruebas por categoría
```bash
# Solo autenticación (login + registro)
npx playwright test e2e/auth/

# Solo intercambio de cursos
npx playwright test e2e/courses/

# Solo presets
npx playwright test e2e/presets/
```

### Ejecutar pruebas en modo visual (headed)
```bash
npm run test:e2e:headed
```

### Ejecutar pruebas en modo UI interactivo
```bash
npm run test:e2e:ui
```

### Debug de pruebas
```bash
npm run test:e2e:debug
```

### Ejecutar solo en Chromium
```bash
npm run test:e2e:chromium
```

### Ejecutar solo en Firefox
```bash
npm run test:e2e:firefox
```

### Ver reporte de pruebas
```bash
npm run test:e2e:report
```

## ⚙️ Configuración

La configuración de Playwright se encuentra en `playwright.config.ts`:

- **Navegadores**: Chromium y Firefox
- **Servidor dev**: Se inicia automáticamente en `http://localhost:5173`
- **Timeouts**: 60s por test, 10s por acción
- **Screenshots**: Solo en fallos
- **Videos**: Solo en fallos
- **Traces**: En reintentos

## 📝 Escribiendo Nuevas Pruebas

### Ejemplo básico

```typescript
import { test, expect } from '@playwright/test';
import { routes } from '../fixtures/test-data';

test.describe('Mi Funcionalidad', () => {
  
  test('debe hacer algo específico', async ({ page }) => {
    // Navegar a la página
    await page.goto(routes.home);
    
    // Interactuar con elementos
    await page.fill('[name="campo"]', 'valor');
    await page.click('button[type="submit"]');
    
    // Verificar resultado
    await expect(page.locator('text=Éxito')).toBeVisible();
  });
});
```

### Usando helpers

```typescript
import { loginUser } from '../helpers/auth-helpers';
import { expectSuccessMessage } from '../helpers/common-helpers';

test('test que requiere autenticación', async ({ page }) => {
  // Login rápido
  await loginUser(page, { email: 'test@test.com', password: 'Pass123' });
  
  // Verificar mensaje
  await expectSuccessMessage(page, '¡Éxito!');
});
```

## 🔍 Selectores Recomendados

Prioridad de selectores (de mejor a peor):

1. **Data-testid**: `[data-testid="mi-elemento"]` ✅ Mejor
2. **Role + Name**: `button[name="submit"]` ✅ Bueno
3. **Text content**: `text="Iniciar sesión"` ⚠️ Puede cambiar con i18n
4. **CSS classes**: `.mi-clase` ❌ Frágil

### Agregar data-testids al código

```tsx
// Componente React
<button data-testid="login-button" onClick={handleLogin}>
  Iniciar sesión
</button>
```

## 🐛 Debugging

### Ver traza de un test fallido
```bash
npx playwright show-trace playwright-report/trace.zip
```

### Ejecutar un solo archivo de pruebas
```bash
npx playwright test e2e/auth/login.spec.ts
```

### Ejecutar un solo test
```bash
npx playwright test -g "debe iniciar sesión exitosamente"
```

### Modo debug paso a paso
```bash
npm run test:e2e:debug
```

## 📊 Reportes

Después de ejecutar las pruebas, se generan reportes en:

- **HTML**: `playwright-report/index.html`
- **JSON**: `playwright-report/results.json`
- **Videos**: `test-results/<test-name>/video.webm` (solo en fallos)
- **Screenshots**: `test-results/<test-name>/screenshot.png` (solo en fallos)

## 🔄 CI/CD

Para ejecutar en CI:

```bash
# Instalar dependencias y navegadores
npm ci
npx playwright install --with-deps

# Ejecutar pruebas
npm run test:e2e
```

Las pruebas en CI automáticamente:
- Ejecutan con `retries: 2`
- No usan paralelización (`workers: 1`)
- Generan reportes JSON para integración

## ✅ Estado Actual de los Tests

### Resumen General
- ✅ **43 tests E2E completados**
- ✅ Todos los componentes tienen data-testid necesarios
- ✅ Helpers completos y funcionales
- ✅ Datos de prueba centralizados y actualizados

### Componentes Actualizados

#### Autenticación (LoginForm, RegisterForm)
- ✅ `data-testid="reset-password-link"` agregado
- ✅ `data-testid="register-link"` agregado
- ✅ `data-testid="login-link"` agregado
- ✅ `autoFocus` en campo email

#### Presets (PresetSelector)
- ✅ `data-testid="preset-selector"` agregado
- ✅ `data-testid="preset-dropdown"` agregado
- ✅ `data-testid="preset-option"` agregado

#### Intercambio (CourseSwap, MiniCourseCard, CurrentVsNew)
- ✅ `data-testid="exchange-modal"` existente
- ✅ `data-testid="compatible-courses-list"` agregado
- ✅ `data-testid="current-vs-new"` agregado
- ✅ `data-testid="mini-course-card"` existente

### ⚠️ Problemas Conocidos del Backend

1. **Error 500 en lugar de 401** para credenciales incorrectas
2. **Mensajes de error genéricos** en algunas validaciones
3. **Validaciones de contraseña** deben alinearse entre frontend y backend

Para más detalles, ver [Resumen de Completación](../E2E_TESTS_COMPLETION_SUMMARY.md)

## 📚 Referencias

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Libreto de Pruebas de Usabilidad](../LIBRETO_PRUEBAS_USABILIDAD.md)
- [Cuestionario Google Forms](../CUESTIONARIO_GOOGLE_FORMS.md)
- [Resumen de Completación E2E](../E2E_TESTS_COMPLETION_SUMMARY.md)

## 💡 Tips

1. **Usa `waitForLoadingToComplete()`** después de navegaciones para asegurar que la página cargó
2. **No uses `page.waitForTimeout()`** a menos que sea absolutamente necesario
3. **Prefiere `await expect().toBeVisible()`** en lugar de `isVisible()`
4. **Agrupa tests relacionados** en `describe` blocks
5. **Usa `beforeEach`** para setup común
6. **Nombra tests descriptivamente** para entender los fallos rápidamente

---

**¿Preguntas?** Revisa el [Playwright Docs](https://playwright.dev/docs/intro) o consulta el archivo de helpers para funciones reutilizables.
