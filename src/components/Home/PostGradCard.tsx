import React from "react";

interface CardProps {
    title: string;
    description: string;
    categories: string[];
    credits: number;
}

const PostGradCard: React.FC<CardProps> = ({ title, description, categories, credits}) => {
    return (
        <div
            className={`flex flex-col relative p-24 justify-center bg-white shadow-md rounded-lg border border-gray-200  w-[56rem] h-[39rem] transition-transform hover:scale-105`}
        >
            {/* Title */}
            <div className="flex items-center mb-4">
                <span className="mr-3 text-3xl font-bold text-gray-900">🖥️</span>
                <h2 className="text-3xl font-bold text-black">{title}</h2>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-24">
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

            {/* Credits */}
            <div className={`absolute bottom-8 right-8 text-right text-black font-regular  text-xs`}>
                {credits} créditos
            </div>
        </div>
    );
};

export default PostGradCard;
