// src/components/Auth/RegisterForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../../services/auth"; // ajusta la ruta según tu estructura

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface FieldErrors {
  username?: string;
  email?: string;
  password?: string;
}

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors({ ...fieldErrors, [name]: undefined });
    }
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    
    // Validar username
    if (form.username.trim().length < 3) {
      errors.username = "El nombre debe tener al menos 3 caracteres";
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.email = "Por favor ingresa un correo electrónico válido";
    }
    
    // Validar password
    if (form.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(form.password)) {
      errors.password = "La contraseña debe contener mayúsculas y minúsculas";
    } else if (!/(?=.*\d)/.test(form.password)) {
      errors.password = "La contraseña debe contener al menos un número";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getErrorMessage = (err: any): string => {
    // Si hay respuesta del servidor
    if (err.response) {
      const { status, data } = err.response;
      
      // Errores específicos por código de estado
      switch (status) {
        case 400:
          if (data?.message) {
            // Mensaje personalizado del backend
            return data.message;
          }
          return "Datos inválidos. Por favor verifica la información ingresada.";
        
        case 409:
          if (data?.message?.includes("email")) {
            return "Este correo electrónico ya está registrado. ¿Deseas iniciar sesión?";
          }
          if (data?.message?.includes("username")) {
            return "Este nombre de usuario ya está en uso. Prueba con otro.";
          }
          return "El usuario ya existe en el sistema.";
        
        case 422:
          return "Los datos enviados no cumplen con los requisitos. Revisa todos los campos.";
        
        case 500:
          return "Error en el servidor. Por favor intenta más tarde.";
        
        default:
          return data?.message || "Error al registrar el usuario. Intenta nuevamente.";
      }
    }
    
    // Error de red
    if (err.request) {
      return "No se pudo conectar con el servidor. Verifica tu conexión a internet.";
    }
    
    // Otro tipo de error
    return "Ocurrió un error inesperado. Por favor intenta nuevamente.";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setSuccess(false);

    try {
      const response = await registerUser(form);
      console.log("✅ Registro exitoso:", response);
      setSuccess(true);
      
      // Limpiar formulario después del éxito
      setForm({ username: "", email: "", password: "" });
      
      // Opcional: redirigir después de unos segundos
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 2000);
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error("Error en registro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-3xl font-bold mb-2 text-black">¡Comienza ahora!</h1>

      {/* Mensaje de error general */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700 font-medium">¡Registro exitoso! Ya puedes iniciar sesión.</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-medium">Usuario</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Digita tu nombre y apellidos"
          className={`w-full border rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
            fieldErrors.username ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {fieldErrors.username && (
          <p className="text-red-600 text-sm mt-1 flex items-center">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {fieldErrors.username}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Digita tu correo electrónico"
          className={`w-full border rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
            fieldErrors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {fieldErrors.email && (
          <p className="text-red-600 text-sm mt-1 flex items-center">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Digita tu contraseña"
          className={`w-full border rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none ${
            fieldErrors.password ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {fieldErrors.password && (
          <p className="text-red-600 text-sm mt-1 flex items-center">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {fieldErrors.password}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Mínimo 6 caracteres, con mayúsculas, minúsculas y números
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registrando...
          </span>
        ) : (
          "Registrarse"
        )}
      </button>

      <p className="text-sm text-center mt-2 text-black">
        Ya tengo cuenta{" "}
        <a href="/login" className="text-purple-600 font-medium hover:underline">
          iniciar sesión
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
