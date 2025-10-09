import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  path?: string;
  duracion: string; // Ej: "4 semestres"
  creditos: number;
  registroSNIES: string;
  modalidad: string;
  tituloOtorga: string;
}

const ProgramCard: React.FC<CardProps> = ({
  image,
  title,
  description,
  buttonText,
  path,
  duracion,
  creditos,
  registroSNIES,
  modalidad,
  tituloOtorga,
}) => {
  const navigateTo = useNavigate();

  const handleClick = () => {
    path && navigateTo(path);
  };

  return (
    <div className="w-96 bg-white border border-textGray text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Imagen */}
      <div className="px-6 pt-4 flex justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover border border-textGray"
        />
      </div>

      {/* Cuerpo */}
      <div className="p-6 text-left">
        <h3 className="text-3xl font-calsans text-black mb-3">{title}</h3>
        <p className="text-black mb-4">{description}</p>

        {/* Detalles del programa */}
        <ul className="text-sm text-gray-700 mb-6 space-y-1">
          <li>
            <strong>Duración:</strong> {duracion}
          </li>
          <li>
            <strong>Créditos:</strong> {creditos}
          </li>
          <li>
            <strong>Registro SNIES:</strong> {registroSNIES}
          </li>
          <li>
            <strong>Modalidad:</strong> {modalidad}
          </li>
          <li>
            <strong>Título que otorga:</strong> {tituloOtorga}
          </li>
        </ul>
        {/* Botón */}
        <button
          className="bg-white flex items-center text-black font-semibold hover:underline"
          onClick={handleClick}
        >
          {buttonText}
          <span className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
