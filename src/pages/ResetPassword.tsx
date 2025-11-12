import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../components/Layouts/AuthLayout";
import loginPhoto from "../assets/LoginImage.png";
// Add the verified-envelope image to assets at src/assets/envelope_verified.png
import envelopeVerified from "../assets/envelope_verified.png";
import { requestPasswordReset, resetPassword } from "../services/auth";
import Button from "../components/Commons/Button";

// UI contract
// - When there is NO token in query: show the Email Request screen
// - When there IS token: show an "Identidad verificada" screen briefly, then the Change Password form

const ResetPassword: React.FC = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const initialStage: "request" | "verify" | "change" = useMemo(() => {
    return token ? "verify" : "request";
  }, [token]);

  const [stage, setStage] = useState<"request" | "verify" | "change">(initialStage);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Intentionally left blank: replaced automatic transition with an explicit button for accessibility and
    // to avoid surprising navigation on small screens. Use the "Continuar" button to move to the change form.
  }, [initialStage]);

  const onSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      await requestPasswordReset(email.trim());
      // Always show a generic success (backend also does so) to avoid user enumeration
      setMessage("Si el correo existe, te enviaremos un enlace para restablecer tu contraseña.");
    } catch (err: any) {
      // Still show generic success to avoid leaking whether an email exists
      setMessage("Si el correo existe, te enviaremos un enlace para restablecer tu contraseña.");
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      if (!token) {
        setError("Falta el token de restablecimiento.");
        return;
      }
      if (newPassword.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }
    await resetPassword(token, newPassword);
    setMessage("¡Contraseña actualizada! Redirigiendo al inicio de sesión...");
    setTimeout(() => navigate("/login?reset=success"), 1200);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 410) {
        setError("El enlace expiró. Solicita uno nuevo.");
      } else if (status === 400) {
        setError("El enlace no es válido o ya fue usado.");
      } else {
        setError("No se pudo restablecer la contraseña. Intenta de nuevo.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Screen 1: Email input (no token)
  if (stage === "request") {
    return (
      <AuthLayout imageSrc={loginPhoto}>
  <div className="space-y-6 text-black max-w-lg">
          <h1 className="text-3xl font-bold">Recuperación de contraseña</h1>
          <p className="text-gray-600">
            Escribe tu correo electrónico para que podamos confirmar tu identidad y ayudarte a recuperar tu contraseña.
          </p>
          <form onSubmit={onSubmitEmail} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digita tu correo electrónico"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue outline-none"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              variant="primary"
              size="medium"
              block={true}
              loading={submitting}
            >
              Confirmar
            </Button>
          </form>
          {message && (
            <p className="text-green-700 border border-green-200 bg-green-50 rounded-md p-3" role="status" aria-live="polite">
              {message}
            </p>
          )}
        </div>
      </AuthLayout>
    );
  }

  // Screen 2: Identity Verified (token present; brief screen)
  if (stage === "verify") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white p-10 rounded-xl shadow-sm text-center w-full max-w-xl">
          <div className="flex items-center justify-center mb-6">
            {/* Mail icon — use provided image file at src/assets/envelope_verified.png */}
            <img src={envelopeVerified} alt="Sobre verificado" className="h-[150px] w-[150px] object-contain" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-2">¡Identidad verificada!</h2>
          <p className="text-gray-600">Gracias por ayudarnos a verificar tu identidad.</p>
          <div className="mt-6">
            <Button
              onClick={() => setStage("change")}
              variant="primary"
              size="medium"
              block={false}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 3: Change password form
  return (
    <AuthLayout imageSrc={loginPhoto}>
  <div className="space-y-6 text-black max-w-lg">
        <h1 className="text-3xl font-bold">Recuperación de contraseña</h1>
        <form onSubmit={onSubmitNewPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nueva contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digita tu nueva contraseña"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue outline-none"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 bg-white text-black focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue outline-none"
              required
              minLength={8}
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            variant="primary"
            size="medium"
            block={true}
            loading={submitting}
          >
            Confirmar
          </Button>
        </form>
        {error && (
          <p className="text-red-700 border border-red-200 bg-red-50 rounded-md p-3" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-700 border border-green-200 bg-green-50 rounded-md p-3" role="status" aria-live="polite">
            {message}
          </p>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
