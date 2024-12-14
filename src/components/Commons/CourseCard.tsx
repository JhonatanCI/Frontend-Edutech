import React from "react";
import editIcon from "../../assets/editIcon.svg";

interface CardProps {
    title: string;
    description: string;
    categories?: string[];
    credits?: number;
    variant: "small" | "medium" | "large"; // To handle size variations
    variantStyle?: "solid" | "dashed"; // New prop for border style
    isEditable?: boolean;
    onClick?: () => void;
}

const CourseCard: React.FC<CardProps> = ({ title, description, categories, credits, variant, variantStyle, isEditable, onClick }) => {
    const gridClass =
        variant === "small"
            ? "col-span-1 row-span-1"
            : variant === "medium"
                ? "col-span-2 row-span-1"
                : "col-span-3 row-span-1"; // Si existiera una variante "large"
    const heightClass = variant === "medium" ? "h-[16rem]" : "h-[16rem]";
    const paddingClass = variant === "large" ? "p-6" : "p-4";
    const creditsPaddingClass =
        variant === "large" ? "bottom-6 right-6" : "bottom-4 right-4";
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
            <div className="flex items-center mb-4">
                <span className="mr-3 text-xl font-bold text-gray-900">🖥️</span>
                <h2 className="text-lg font-bold text-black">{title}</h2>
            </div>

            {/* Categories */}
            {categories && (
                <div
                    className="mb-4 overflow-hidden text-xs font-semibold text-green-700 whitespace-nowrap"
                    style={{ textOverflow: "ellipsis", maxWidth: "100%" }}
                    title={categories.sort().join(", ")} // Tooltip para mostrar las categorías completas
                >
                    <span className="truncate">
                        {categories.sort().join(", ")} {/* Ordena y une las categorías */}
                    </span>
                </div>
            )}

            {/* Description */}
            <p className="text-sm text-black mb-4">{description}</p>

            {/* Credits */}
            {credits && (
                <div
                    className={`absolute ${creditsPaddingClass} text-right text-black font-regular text-xs`}
                >
                    {credits} créditos
                </div>
            )}
        </div>
    );
};

export default CourseCard;