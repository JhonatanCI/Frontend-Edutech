// src/components/Layouts/AuthLayout.tsx
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  imageSrc: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, imageSrc }) => {
  return (
    <div className="flex h-screen">
      {/* Columna izquierda */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <div className="w-3/4 max-w-md">{children}</div>
      </div>

      {/* Columna derecha con imagen */}
      <div className="w-1/2 bg-gray-100">
        <img
          src={imageSrc}
          alt="Auth visual"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
