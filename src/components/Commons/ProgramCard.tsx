import React from "react";
import editIcon from "../../assets/editIcon.svg";

interface ProgramCardProps {
  title: string;
  description: string;
  categories?: string[];
  credits: number;
  duracion: string;
  registroSNIES: string;
  modalidad: string;
  tituloOtorga: string;
  variant: "small" | "medium" | "large";
  variantStyle?: "solid" | "dashed";
  isEditable?: boolean;
  onClick?: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  description,
  categories,
  credits,
  duracion,
  registroSNIES,
  modalidad,
  tituloOtorga,
  variant,
  variantStyle,
  isEditable,
  onClick,
}) => {
  const gridClass =
    variant === "small"
      ? "col-span-1 row-span-1"
      : variant === "medium"
        ? "col-span-2 row-span-1"
        : "col-span-3 row-span-1";

  const heightClass = variant === "medium" ? "h-[20rem]" : "h-[22rem]";
  const paddingClass = variant === "large" ? "p-6" : "p-4";
  const borderClass =
    variantStyle === "dashed"
      ? "border-2 border-dashed border-secondaryBlue"
      : variantStyle === "solid"
        ? "border-2 border-solid border-secondaryBlue"
        : "border-none";

  return (
    <div
      className={`flex flex-col relative bg-white shadow-md rounded-lg border border-gray-200 ${gridClass} ${borderClass} ${heightClass} ${paddingClass} transition-transform hover:scale-105 cursor-pointer`}
      onClick={onClick}
    >
      {/* Editable Icon */}
      {isEditable && (
        <button className="absolute -top-6 -right-6 hover:scale-125">
          <img src={editIcon} alt="edit" />
        </button>
      )}

      {/* Title */}
      <div className="flex items-center mb-2">
        <span className="mr-3 text-xl font-bold text-gray-900">🎓</span>
        <h2 className="text-lg font-bold text-black">{title}</h2>
      </div>

      {/* Categories */}
      {categories && (
        <div
          className="mb-3 overflow-hidden text-xs font-semibold text-green-700 whitespace-nowrap"
          style={{ textOverflow: "ellipsis", maxWidth: "100%" }}
          title={categories.sort().join(", ")}
        >
          <span className="truncate">{categories.sort().join(", ")}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-black mb-3">{description}</p>

      {/* Extra details */}
      <ul className="text-xs text-gray-700 space-y-1">
        <li>
          <strong>Duración:</strong> {duracion}
        </li>
        <li>
          <strong>Créditos:</strong> {credits}
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
    </div>
  );
};

export default ProgramCard;
