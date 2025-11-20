// src/components/Auth/RegisterForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../services/auth";
import { loginSuccess, setFavoriteMessage } from "../../redux/authSlice";
import { isValidToken } from "../../utils/jwt";
import Button from "../Commons/Button";
import { usePendingFavorite } from "../../hooks/usePendingFavorite";
import { addFavorite } from "../../services/favorites";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getPendingFavorite, clearPendingFavorite } = usePendingFavorite();
  
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
      
      let backendMessage = null;
      
      if (data?.message) {
        backendMessage = data.message;
      } else if (typeof data === 'string') {
        backendMessage = data;
      } else if (data?.error) {
        backendMessage = data.error;
      } else if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        backendMessage = data.errors[0].message || data.errors[0];
      }
      

      if (backendMessage) {

        if (backendMessage.toLowerCase().includes("usuario ya existe")) {
          return "Este nombre de usuario ya está registrado. Por favor elige otro.";
        }
        if (backendMessage.toLowerCase().includes("email ya está en uso") || 
            backendMessage.toLowerCase().includes("correo ya está en uso")) {
          return "Este correo electrónico ya está registrado. ¿Deseas iniciar sesión?";
        }
        
        if (!backendMessage.includes("java.") && 
            !backendMessage.includes("Exception") && 
            backendMessage.length < 200) {
          return backendMessage;
        }
      }
      
      switch (status) {
      case 400:
        return backendMessage || "Datos inválidos. Por favor verifica la información ingresada.";
        
      case 409:
        if (backendMessage?.toLowerCase().includes("email")) {
          return "Este correo electrónico ya está registrado. ¿Deseas iniciar sesión?";
        }
        if (backendMessage?.toLowerCase().includes("username") || 
              backendMessage?.toLowerCase().includes("usuario")) {
          return "Este nombre de usuario ya está en uso. Prueba con otro.";
        }
        return "El usuario ya existe en el sistema.";
        
      case 422:
        return backendMessage || "Los datos enviados no cumplen con los requisitos. Revisa todos los campos.";
        
      case 500:
        // Para errores 500, solo usar el mensaje del backend si es claro
        if (backendMessage && !backendMessage.includes("java.") && backendMessage.length < 100) {
          return backendMessage;
        }
        return "Error en el servidor. Por favor intenta más tarde.";
        
      default:
        return backendMessage || "Error al registrar el usuario. Intenta nuevamente.";
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
      
      try {
        const loginResponse = await loginUser({
          email: form.email,
          password: form.password,
        });

        if (loginResponse.token && loginResponse.user && isValidToken(loginResponse.token)) {
          dispatch(loginSuccess({
            user: {
              id: loginResponse.user.id,
              username: loginResponse.user.username,
              email: loginResponse.user.email,
            },
            token: loginResponse.token,
          }));

          const pendingFavorite = getPendingFavorite();
          if (pendingFavorite) {
            try {
              await addFavorite(
                Number(loginResponse.user.id),
                pendingFavorite.itemId,
                pendingFavorite.itemType
              );

              const itemTypeText = pendingFavorite.itemType === "PROGRAM" ? "Programa" : "Curso";
              dispatch(setFavoriteMessage(`${itemTypeText} guardado exitosamente. Puedes verlo en tus favoritos.`));
              clearPendingFavorite();
            } catch (favError) {
              console.error("Error al guardar favorito:", favError);
            }
          }

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (loginErr) {
        console.error("Error en login automático:", loginErr);
        setForm({ username: "", email: "", password: "" });
      }
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
              <p className="text-sm text-green-700 font-medium">¡Registro exitoso! Redirigiendo...</p>
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
          className={`w-full border rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue outline-none ${
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
          className={`w-full border rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue outline-none ${
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
          className={`w-full border rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue outline-none ${
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

      <Button
        type="submit"
        disabled={loading}
        variant="primary"
        size="medium"
        block={true}
        loading={loading}
      >
        Registrarse
      </Button>

      <p className="text-sm text-center mt-2 text-black">
        Ya tengo cuenta{" "}
        <a href="/login" className="text-primaryBlue font-medium hover:underline">
          iniciar sesión
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
