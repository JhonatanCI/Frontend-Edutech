import React from "react";

interface SmallCardProps {
  title: string;
  description: string;
  categories: string[];
  credits?: number;
  onClick?: () => void;
}

const MiniCourseCard: React.FC<SmallCardProps> = ({
  title,
  description,
  categories,
  credits,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col relative bg-white shadow-md rounded-lg border border-gray-200 col-span-1 row-span-1 h-[12rem] w-[14rem]  p-3 transition-transform hover:scale-105 cursor-pointer`}
      onClick={onClick}
    >
      {/* Title */}
      <div className="flex items-center mb-2">
        <span className="mr-2 text-lg font-bold text-gray-900">🖥️</span>
        <h2 className="text-sm font-bold text-black truncate">{title}</h2>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-1 mb-2">
        {categories.map((category, index) => (
          <span
            key={index}
            className="bg-green-100 text-green-700 text-[0.6rem] font-semibold px-1 py-0.5 rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-xs text-black mb-2 truncate-2-lines">{description}</p>

      {/* Credits */}
      {credits && (
        <div className="absolute bottom-2 right-2 text-right text-black font-regular text-[0.6rem]">
          {credits} créditos
        </div>
      )}
    </div>
  );
};

export default MiniCourseCard;