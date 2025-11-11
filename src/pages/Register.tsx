// src/pages/Register.tsx
import React from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import RegisterForm from "../components/Auth/RegisterForm";
import signupPhoto from "../assets/RegisterImage.png";

export const Register: React.FC = () => {
  return (
    <AuthLayout imageSrc={signupPhoto}>
      <RegisterForm />
    </AuthLayout>
  );
};
