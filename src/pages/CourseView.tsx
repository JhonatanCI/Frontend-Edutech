import React from "react"
import { fullProgramExample } from "../consts/fullconsts.d"
import { ProgramCourse } from "../model/types"

interface CourseViewProps {
    course?: ProgramCourse
}

const CourseView: React.FC<CourseViewProps> = ({course}) => {
    const coverImage = fullProgramExample.image

    if(!course){
        return
    }

    return (
        <div>
            {/* Cover Image */}
            <div className="h-[12rem] w-full overflow-hidden">
                    <img
                        src={coverImage}
                        alt="Cover"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Modal Content */}
                <div className="flex h-[calc(100%-12rem)]">
                    {/* Left Content */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        {/* Title */}
                        <h2 className="text-3xl font-bold text-black mb-4">{course.name}</h2>

                        {/* Description */}
                        <p className="text-gray-700 text-sm mb-6">{course.description}</p>

                        {/* Course Content */}
                        <h3 className="text-lg font-bold text-black mb-3">
                            Contenido del Curso
                        </h3>
                    </div>

                    {/* Right Panel */}
                    <div className="w-[20rem] bg-gray-100 p-6 border-l border-gray-200">
                        <h4 className="text-lg font-bold mb-4 text-black">Detalles</h4>
                        <ul className="space-y-4 text-sm text-gray-700">
                            <li>
                                <strong className="font-medium">Nivel:</strong> Intermedio
                            </li>
                            <li>
                                <strong className="font-medium">Créditos:</strong> {course.credits}
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
    )
}

export default CourseView