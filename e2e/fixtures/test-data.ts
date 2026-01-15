/**
 * Datos de prueba para tests e2e
 * Centralizados para facilitar mantenimiento y reutilización
 */

export const testUsers = {
    // Usuario nuevo para registro
    newUser: {
        username: `testuser_${Date.now()}`,
        email: `test_${Date.now()}@icesi.edu.co`,
        password: 'TestPassword123',
    },

    // Usuario existente para login
    existingUser: {
        email: 'existing@icesi.edu.co',
        password: 'ExistingPassword123',
    },

    // Usuario con credenciales incorrectas
    invalidUser: {
        email: 'wrong@icesi.edu.co',
        password: 'WrongPassword123',
    },
};

export const testPrograms = {
    // Programa con presets configurados
    programWithPresets: {
        id: 'test-program-with-presets-id',
        name: 'Ingeniería de Sistemas',
    },

    // Programa con cursos intercambiables
    programWithExchangeableCourses: {
        id: 'test-program-exchange-id',
        name: 'Ingeniería de Software',
    },
};

export const testCourses = {
    courseToExchange: {
        id: 'course-to-exchange-id',
        name: 'Algoritmos y Estructuras de Datos',
    },

    replacementCourse: {
        id: 'replacement-course-id',
        name: 'Estructuras de Datos Avanzadas',
    },
};

export const validationMessages = {
    // Registro
    registroExitoso: '¡Registro exitoso! Redirigiendo...',
    usuarioYaExiste: 'Este nombre de usuario ya está registrado. Por favor elige otro.',
    emailYaRegistrado: 'Este correo electrónico ya está registrado. ¿Deseas iniciar sesión?',

    // Login
    loginExitoso: '¡Inicio de sesión exitoso! Redirigiendo...',
    credencialesIncorrectas: 'Credenciales incorrectas',

    // Intercambio de cursos
    noCursosDisponibles: 'No hay cursos disponibles para intercambio.',
    intercambioExitoso: 'Intercambio realizado exitosamente',

    // Presets
    cargandoConfiguraciones: 'Cargando configuraciones...',
    sinConfiguracion: 'Sin configuración predeterminada',
    presetAplicado: 'Configuración aplicada exitosamente',
};

export const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    resetPassword: '/reset-password',
    profile: '/profile',
    search: '/search',
    program: (id: string) => `/program/${id}`,
};

export const passwords = {
    valid: {
        simple: 'Password123',
        strong: 'StrongP@ssw0rd!',
    },
    invalid: {
        tooShort: 'Pass1',
        noUppercase: 'password123',
        noLowercase: 'PASSWORD123',
        noNumber: 'PasswordAbc',
        onlyLetters: 'Password',
    },
};
