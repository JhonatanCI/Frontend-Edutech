import { useState, useEffect } from "react";
import { getAllProgramCourses } from "../services/academicCourses";
import { FullProgram, ProgramCourse } from "../model/types";
import { toProgramCourse } from "../mappers/programCourseMapper";

export const useProgramCourses = (program: FullProgram | null) => {
    const [programCourses, setProgramCourses] = useState<ProgramCourse[] | null>(null);

    useEffect(() => {
        async function fetchProgramCourses() {
            try {
                if (!program) {
                    setProgramCourses(null); // Limpia si no hay programa
                    return;
                }

                const programsFetched = await getAllProgramCourses(program?.id)
                const programCourses = toProgramCourse(programsFetched);
                setProgramCourses(programCourses)
            } catch (error) {
                console.error("No se ha podido obtener los cursos del programa")
            }
        }

        fetchProgramCourses()
    }, [program])

    return programCourses
} 