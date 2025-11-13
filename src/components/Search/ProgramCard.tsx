import React from "react";
import { ProgramCardProps } from "../../types/search.types";
import { useFavorites } from "../../hooks/useFavorites";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProgramCard: React.FC<ProgramCardProps> = ({
  result,
  onLearnMore,
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { toggleFavorite, isFavorite } = useFavorites();
  const isItemFavorite = isFavorite(result.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para guardar favoritos");
      return;
    }

    try {
      await toggleFavorite(result.id, result.itemType);
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
    }
  };
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDuration = (duration: number, unit: string): string => {
    if (unit === "SEMESTERS") {
      return `${duration} ${duration === 1 ? "semestre" : "semestres"}`;
    }
    return `${duration} ${duration === 1 ? "hora" : "horas"}`;
  };

  const getBadgeColor = (
    itemType: string,
    programType: string | null,
  ): string => {
    if (itemType === "COURSE") {
      return "bg-[#4CB979]";
    }

    switch (programType) {
    case "ESPECIALIZACION":
      return "bg-[#E4EB60]";
    case "MAESTRIA":
      return "bg-[#5454E9]";
    case "DOCTORADO":
      return "bg-[#5454E9]";
    case "CERTIFICACION":
      return "bg-[#E9683B]";
    default:
      return "bg-[#88898C]";
    }
  };

  const getBadgeText = (
    itemType: string,
    programType: string | null,
  ): string => {
    if (itemType === "COURSE") {
      return "Curso";
    }
    return programType || "Programa";
  };

  const getModalityColor = (modality: string): string => {
    switch (modality) {
    case "VIRTUAL":
      return "bg-blue-100 text-blue-800";
    case "PRESENCIAL":
      return "bg-green-100 text-green-800";
    case "HIBRIDO":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
    }
  };

  const getModalityText = (modality: string): string => {
    switch (modality) {
    case "VIRTUAL":
      return "Virtual";
    case "PRESENCIAL":
      return "Presencial";
    case "HIBRIDO":
      return "Híbrido";
    default:
      return modality;
    }
  };

  const tags = result.tags
    ? result.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)
    : [];

  return (
    <div className="bg-white shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          {result.imageUrl ? (
            <img
              src={`https://res.cloudinary.com/dmmmacrxg/image/upload/${result.imageUrl}`}
              alt={result.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={`${
              result.imageUrl ? "hidden" : ""
            } flex flex-col items-center justify-center text-gray-400`}
          >
            <svg
              className="w-12 h-12 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">Sin imagen</span>
          </div>
        </div>
        <div
          className={`absolute top-2 right-2 px-2 py-1 text-white text-xs font-semibold ${getBadgeColor(
            result.itemType,
            result.programType,
          )}`}
        >
          {getBadgeText(result.itemType, result.programType)}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">
            {result.name}
          </h3>
          <button
            onClick={handleFavoriteClick}
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
            aria-label={isItemFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <svg
              className="w-5 h-5"
              fill={isItemFavorite ? "currentColor" : "none"}
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
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {result.description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs">
                +{tags.length - 3} más
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
          <div>
            <span className="font-semibold">Modalidad:</span>
            <span
              className={`ml-1 px-2 py-1 text-xs ${getModalityColor(
                result.modality,
              )}`}
            >
              {getModalityText(result.modality)}
            </span>
          </div>
          <div>
            <span className="font-semibold">Duración:</span>
            <span className="ml-1">
              {formatDuration(result.duration, result.durationUnit)}
            </span>
          </div>
          <div>
            <span className="font-semibold">Créditos:</span>
            <span className="ml-1">{result.credits}</span>
          </div>
          <div>
            <span className="font-semibold">Nivel:</span>
            <span className="ml-1">{result.programType || "General"}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-gray-900">
            {formatPrice(result.price)}
          </div>
          <button
            onClick={() =>
              onLearnMore?.(result.id, result.itemType, result.name)
            }
            className="bg-[#5454E9] text-white px-4 py-2 hover:bg-[#3d3db5] transition-colors duration-200 text-sm font-medium"
          >
            Conoce más
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
