import React from "react";

interface CardProps {
    title: string;
    description: string;
    categories: string[];
    duracion: string;
    credits: number;
    registroSNIES: string;
    modalidad: string;
    tituloOtorga: string;
}

const PostGradCard: React.FC<CardProps> = ({
    title,
    description,
    categories,
    duracion,
    credits,
    registroSNIES,
    modalidad,
    tituloOtorga
}) => {
    return (
        <div
            className="flex flex-col relative p-24 justify-center bg-white shadow-md rounded-lg border border-gray-200 w-[56rem] h-[39rem] transition-transform hover:scale-105"
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

            {/* Detalles */}
            <ul className="text-sm text-gray-700 mb-6 space-y-1">
                <li><strong>Duración:</strong> {duracion}</li>
                <li><strong>Créditos:</strong> {credits}</li>
                <li><strong>Registro SNIES:</strong> {registroSNIES}</li>
                <li><strong>Modalidad:</strong> {modalidad}</li>
                <li><strong>Título que otorga:</strong> {tituloOtorga}</li>
            </ul>
        </div>
    );
};

export default PostGradCard;
