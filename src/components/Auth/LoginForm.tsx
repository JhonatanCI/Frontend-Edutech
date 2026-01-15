import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { loginStart, loginSuccess, loginFailure, setFavoriteMessage } from "../../redux/authSlice";
import { isValidToken } from "../../utils/jwt";
import { RootState } from "../../redux/store";
import Button from "../Commons/Button";
import { usePendingFavorite } from "../../hooks/usePendingFavorite";
import { addFavorite } from "../../services/favorites";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { getPendingFavorite, clearPendingFavorite } = usePendingFavorite();

  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await loginUser(form);
      console.log("✅ Login exitoso:", response);

      // Verificar que el backend envía un token
      if (response.token) {
        // El backend ya envía los datos del usuario, usamos esos directamente
        if (response.user && isValidToken(response.token)) {
          dispatch(loginSuccess({
            user: {
              id: response.user.id,
              username: response.user.username,
              email: response.user.email
            },
            token: response.token
          }));

          setSuccess(true);

          const pendingFavorite = getPendingFavorite();
          if (pendingFavorite) {
            try {
              await addFavorite(
                Number(response.user.id),
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

          // Redirigir al home después de 1 segundo
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          dispatch(loginFailure("Datos de usuario incompletos"));
        }
      } else {
        dispatch(loginFailure("No se recibió token del servidor"));
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === "object" && "response" in err
        ? (err.response as { data?: { message?: string } })?.data?.message || "Credenciales incorrectas"
        : "Credenciales incorrectas";
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-3xl font-bold mb-2 text-black">¡Bienvenido de vuelta!</h1>

      {/* Correo electrónico */}
      <div>
        <label className="block text-gray-700 font-medium">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Digita tu correo electrónico"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue outline-none"
          required
          autoFocus
        />
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-gray-700 font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Digita tu contraseña"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue outline-none"
          required
        />
      </div>

      {/* Olvidar contraseña */}
      <div className="text-right text-sm">
        <a
          href="/reset-password"
          className="text-primaryBlue hover:text-primaryBlue-dark font-medium"
          data-testid="reset-password-link"
        >
          ¿Has olvidado tu contraseña?
        </a>
      </div>

      {/* Botón */}
      <Button
        type="submit"
        disabled={loading}
        variant="primary"
        size="medium"
        block={true}
        loading={loading}
      >
        Iniciar sesión
      </Button>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && (
        <p className="text-green-600 text-center font-medium">¡Inicio de sesión exitoso! Redirigiendo...</p>
      )}

      <p className="text-sm text-center mt-2 text-black">
        No tengo cuenta{" "}
        <a href="/register" className="text-primaryBlue font-medium hover:underline" data-testid="register-link">
          Registrarme
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
