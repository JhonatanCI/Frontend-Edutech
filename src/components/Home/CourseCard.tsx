import React from "react";

interface CardProps {
    title: string;
    description: string;
    categories: string[];
    variant: "small" | "medium" | "large"; // To handle size variations
    variantStyle?: "solid" | "dashed"; // New prop for border style
    isEditable?: boolean; // Determines if the pencil icon is shown

}

const CourseCard: React.FC<CardProps> = ({ title, description, categories, variant, variantStyle, isEditable }) => {
    
    const handleClick = () => {
        console.log("Se ha clickeado a ", title)
    }


    const gridClass =
        variant === "small"
            ? "col-span-1 row-span-1"
            : variant === "medium"
            ? "col-span-2 row-span-1"
            : "col-span-3 row-span-1"; // Si existiera una variante "large"
    const heightClass = variant === "medium" ? "h-[12rem]" : "h-[12rem]";
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
            onClick={handleClick}
        >
            {/* Editable Icon */}
            {isEditable && (
                <button className="absolute -top-6 -right-6 hover:scale-125">
                    <img src="src/assets/editIcon.svg" alt="edit" />
                </button>
            )}
            {/* Title */}
            <div className="flex items-center mb-4">
                <span className="mr-3 text-xl font-bold text-gray-900">🖥️</span>
                <h2 className="text-lg font-bold text-black">{title}</h2>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category, index) => (
                    <span
                        key={index}
                        className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full"
                    >
                        {category}
                    </span>
                ))}
            </div>

            {/* Description */}
            <p className="text-sm text-black mb-4">{description}</p>
        </div>
    );
};

export default CourseCard;