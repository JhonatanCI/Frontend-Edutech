import React, { useState } from "react";
import { ProgramCourse } from "../../model/types";
import SearchBar from "../Commons/SearchBar"
import CurrentVsNew from "./CurrentVsNew"

import { defaultCourses } from "../../consts/courses.d";
import CourseCard from "../Commons/CourseCard";
import Button from "../Commons/Button";

interface CourseSwapProps {
    course: ProgramCourse;
}

const CourseSwap: React.FC<CourseSwapProps> = ({ course }) => {

    const [coursesMatch, setCoursesMatch] = useState(defaultCourses)

    return (
        <div className="h-screen w-full px-16 py-8">
            <div className="p-6">
                <div>
                    <h3 className="text-3xl font-bold text-black">
                        Intercambiar Curso
                    </h3>
                    <div className="flex flex-row justify-between gap-24 px-0 mt-6">
                        <p className="text-gray-700 text-sm w-2/5">
                            Si lo deseas puedes cambiar este curso por otro que se adapte más a tus necesidades. Puedes hacer uso del buscador para encontrarlo.
                        </p>
                        <div className="w-2/3">
                            <SearchBar searchBy="cursos" />
                        </div>
                    </div>
                </div>

                <div className="flex w-full justify-between mt-16">
                    <div className="w-3/6">
                        <CurrentVsNew current={course} />
                    </div>
                    <div className="w-3/6">
                    {"A este scroll"}
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] max-w-[40rem] w-full bg-white overflow-y-auto max-h-[20rem] p-2 scrollbar-blue">
                    {coursesMatch.map(course => {
                                return <CourseCard
                                    key={course.id}
                                    title={course.name}
                                    description={course.description}
                                    categories={["Categoria 1", "Categoria 1",]}
                                    variant="small"
                                    scalable
                                />
                            })}
                        </div>
                        <div className="flex justify-between mt-8">
                            <button
                                className="text-black font-inter font-semibold rounded border border-black bg-white transition-all duration-300 text-md py-3 px-12 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                            >
                                No intercambiar
                            </button>
                            <Button>Confirmar intercambio</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CourseSwap