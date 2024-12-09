import { fullProgramExample } from "../consts/fullconsts.d";
import { useFullMicroLearning } from "../hooks/useFullMicroLearning";
import { MicroLearning } from "../model/types";
import { useParams } from "react-router-dom";


const MicroLearningView = () => {
    
    const {name} = useParams()
    const microL: MicroLearning | null = useFullMicroLearning(name)
    const coverImage = fullProgramExample.image;
    const courseContent: string[] = ["Creación de cronogramas", "Monitoreo y control", "Herramientas de cronogramas", "Actualización de cronogramas"];


    if(!microL) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col px-16 py-8">
            {/* Cover Image */}
            <div
                className="h-[12rem] w-full bg-cover bg-center relative"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${coverImage})`,
                }}
            >
                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center pl-14">
                    <h2 className="text-4xl font-bold text-white">{microL.name}</h2>
                </div>
            </div>

            {/* Modal Content */}
            <div className="flex h-[calc(100%-12rem)] py-10">
                {/* Left Content */}
                <div className="flex-1 p-6">
                    <p className="text-gray-700 text-sm mb-6">{microL.description}</p>
                    <h3 className="text-lg font-bold text-black mb-3">
                        Contenido del Curso
                    </h3>
                    {/* Contenedor de la lista sin scroll */}
                    <div className="border border-gray-300 rounded-md">
                        <ol className="list-decimal list-inside p-4">
                            {courseContent.map((item, index) => (
                                <li key={index} className="text-black py-2 border-b last:border-none">
                                    {item}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-1/3 h-[22rem] bg-black border-2 border-solid border-gray-500 flex flex-col">
                    <div className="flex-1 w-full bg-cover bg-center relative"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${coverImage})`,
                        }}
                    >
                    </div>
                    <div className="h-[10%] bg-offsetBlack w-full flex justify-start items-center px-12">
                        <h4 className="text-lg font-bold text-white">Detalles</h4>
                    </div>
                    <ul className="px-12 py-8 text-xl text-black bg-white">
                        <li className="py-2">
                            <strong className="font-medium">☑️ {microL.type}</strong>
                        </li>
                        <li className="py-2">
                            <strong className="font-medium">☑️ {microL.modality}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MicroLearningView;