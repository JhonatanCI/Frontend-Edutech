import React from "react";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
  itemType?: "PROGRAM" | "COURSE";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  itemName,
  itemType,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  const getItemTypeText = () => {
    if (itemType === "PROGRAM") return "programa";
    if (itemType === "COURSE") return "curso";
    return "elemento";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg w-[28rem] shadow-lg p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Cerrar modal"
        >
          ✖
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-[#5454E9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Inicia sesión para guardar {itemType === "PROGRAM" ? "programas" : itemType === "COURSE" ? "cursos" : "programas o cursos"}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          {itemName ? (
            <>
              Para guardar <span className="font-semibold">"{itemName}"</span> en tus favoritos,
              necesitas tener una cuenta.
            </>
          ) : (
            <>
              Para guardar este {getItemTypeText()} en tus favoritos, necesitas tener una cuenta.
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogin}
            className="w-full bg-[#5454E9] text-white py-3 rounded-lg hover:bg-[#3d3db5] transition-colors duration-200 font-medium"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={handleRegister}
            className="w-full bg-white text-[#5454E9] py-3 rounded-lg border-2 border-[#5454E9] hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Registrarse
          </button>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Guardaremos este {getItemTypeText()} automáticamente después de que inicies sesión
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
