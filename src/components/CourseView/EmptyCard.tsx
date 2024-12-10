import React from "react";

interface EmptyCardProps {
    variant: "small" | "medium" | "large", // To handle size variations
    scalable?: boolean;
}

const EmptyCard: React.FC<EmptyCardProps> = ({variant, scalable = false}) => {
    const categories = ["Categoria 1", "Categoria 2"]

    const gridClass =
      variant === "small"
        ? "col-span-1 row-span-1"
        : variant === "medium"
        ? "col-span-2 row-span-1"
        : "col-span-3 row-span-1";
    const heightClass = "h-[15rem]";
    const paddingClass = variant === "large" ? "p-6" : "p-4";
    const creditsPaddingClass =
      variant === "large" ? "bottom-6 right-6" : "bottom-4 right-4";
    const borderClass = "border-2 border-solid border-secondaryBlue"
  
    const scaleStyle = scalable
      ? {
          transform: "scale(0.8)", // Cambia este valor según el tamaño deseado
          transformOrigin: "top left", // Opcional: desde dónde se escalará
        }
      : {};
  
    return (
      <div style={scaleStyle}>
        <div
          className={`flex flex-col relative bg-gray-400 shadow-md rounded-lg border w-[16rem] border-gray-200 ${gridClass} ${borderClass} ${heightClass} ${paddingClass}`}
        >
          {/* Title */}
          <div className="flex items-center mb-4">
            <span className="mr-3 text-xl font-bold text-gray-900">🖥️</span>
            <h2 className="text-lg font-bold text-black">{"Curso vacio"}</h2>
          </div>
  
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 text-[0.6rem] font-semibold px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
  
          {/* Description */}
          <p className="text-sm text-black mb-4">{""}</p>
  
          <div
              className={`absolute ${creditsPaddingClass} text-right text-black font-regular text-xs`}
            >
              0 créditos
            </div>
        </div>
      </div>
    );
  };
  
  export default EmptyCard;