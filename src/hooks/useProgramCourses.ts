import { useState, useEffect } from "react";
import { getAllProgramCourses } from "../services/academicCourses";
import { ProgramCourse } from "../model/types";
import { toProgramCourse } from "../mappers/programCourseMapper";
import { programCourses as courses } from "../consts/fullconsts.d";

export const useProgramCourses = (name: string | undefined) => {
    const [programCourses, setProgramCourses] = useState<ProgramCourse[] | null>(null);

    useEffect(() => {
        async function fetchProgramCourses() {
            try {

                if (!name) {
                    throw new Error("El parámetro 'name' es undefined");
                }

                const programsFetched = await getAllProgramCourses(name)
                const programCourses = toProgramCourse(programsFetched);
                setProgramCourses(programCourses)
            } catch (error) {
                setProgramCourses(courses)
                console.error("No se ha podido obtener los cursos del programa")
            }
        }

        fetchProgramCourses()
    }, [])

    return programCourses
} 