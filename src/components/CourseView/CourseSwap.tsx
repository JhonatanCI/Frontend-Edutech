import React, { useState, useEffect } from "react";
import { useAvailableCoursesContext } from "../../hooks/useAvailableCoursesContext";
import { Course, ProgramCourse } from "../../model/types";
import SearchBar from "../Commons/SearchBar";
import CurrentVsNew from "./CurrentVsNew";
import MiniCourseCard from "./MiniCourseCard";
import Button from "../Commons/Button";
import useCoursesMatched from "../../hooks/useCoursesMatched";

import { exactCoincidences, filterCourses } from "../../filters/filters";

interface CourseSwapProps {
    course: ProgramCourse;
    close: () => void;
}

const CourseSwap: React.FC<CourseSwapProps> = ({ course, close }) => {
    const { state, updateCourses } = useAvailableCoursesContext();

    const response =
        course.flexibility === "CONDICIONADO"
            ? useCoursesMatched(course.outcomesContribution)
            : state.courses;

    const [newCourse, setNewCourse] = useState<Course | null>(null);
    const [coursesMatch, setCoursesMatched] = useState<Course[] | null>(null);

    useEffect(() => {
        if (response) {
            const filteredCourses = response.filter(
                (matchedCourse) => matchedCourse.id !== course.courseId
            );
            const exactMatched = (course.flexibility === "CONDICIONADO")? exactCoincidences(course, filteredCourses) : filteredCourses
            setCoursesMatched(exactMatched);
        }
    }, [response, course.courseId]);

    const handleSearch = (query: string) => {
        if (response) {
            const coursesFiltered = filterCourses(
                response.filter((matchedCourse) => matchedCourse.id !== course.courseId),
                query
            );
            setCoursesMatched(coursesFiltered);
        }
    };

    const swap = () => {
        if (newCourse) {
            updateCourses(course, newCourse);
            close();
        }
    };

    return (
        <div className="h-screen w-full px-16 py-8">
            <div className="p-6">
                <div>
                    <h3 className="text-3xl font-bold text-black">Intercambiar Curso</h3>
                    <div className="flex flex-row justify-between gap-24 px-0 mt-6">
                        <p className="text-gray-700 text-sm w-2/5">
                            Si lo deseas puedes cambiar este curso por otro que se adapte más a tus necesidades. Puedes hacer uso del buscador para encontrarlo.
                        </p>
                        {course.flexibility === "FLEXIBLE" ? (
                            <div className="w-2/3">
                                <SearchBar handleClick={handleSearch} search="cursos" by="Gerencia de Proyectos, Formulación de..." />
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="flex w-full justify-between mt-16">
                    <div className="w-3/6">
                        <CurrentVsNew current={course} newCourse={newCourse} />
                    </div>
                    <div className="w-3/6">
                        {coursesMatch ? (
                            coursesMatch.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] max-w-[50rem] w-full bg-white overflow-y-auto max-h-[20rem] p-2 scrollbar-blue">
                                        {coursesMatch.map((course) => (
                                            <MiniCourseCard
                                                key={course.id}
                                                title={course.name}
                                                description={course.description}
                                                categories={course.outcomes}
                                                onClick={() => setNewCourse(course)}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex gap-20 mt-8">
                                        <button
                                            className="text-black font-inter font-semibold rounded border border-black bg-white transition-all duration-300 text-md py-3 px-12 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                                            onClick={close}
                                        >
                                            No intercambiar
                                        </button>
                                        <Button onClick={swap} disabled={!newCourse}>
                                            Confirmar intercambio
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500">No hay cursos disponibles para intercambio.</p>
                            )
                        ) : (
                            <div className="flex items-center justify-center h-screen">
                                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSwap;