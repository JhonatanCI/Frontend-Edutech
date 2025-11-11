import React from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import loginPhoto from "../assets/LoginImage.png"; // usa tu imagen

export const Login: React.FC = () => {
  return (
    <AuthLayout imageSrc={loginPhoto}>
      <LoginForm />
    </AuthLayout>
  );
};
