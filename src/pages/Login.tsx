import React from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import loginPhoto from "../assets/LoginImage.png"; // usa tu imagen
import { useSearchParams } from "react-router-dom";

export const Login: React.FC = () => {
  const [params] = useSearchParams();
  const showResetSuccess = params.get("reset") === "success";
  return (
    <AuthLayout imageSrc={loginPhoto}>
      {showResetSuccess && (
        <div className="mb-4 text-green-800 bg-green-50 border border-green-200 rounded-md p-3" role="status" aria-live="polite">
          Tu contraseña fue actualizada. Inicia sesión con tu nueva contraseña.
        </div>
      )}
      <LoginForm />
    </AuthLayout>
  );
};
