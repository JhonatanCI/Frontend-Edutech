import { useState, useEffect } from "react";
import { FullProgram, FullProgramRaw } from "../model/types";
import { getFullProgram } from "../services/academicPrograms";

import { fullProgramExample } from "../consts/fullconsts.d";
import { toProgramCourse } from "../mappers/programCourseMapper";

export const useFullProgram = (name: string | undefined) => {
    const [program, setProgram] = useState<FullProgram | null>(null)
    
    useEffect(() => {
        const fetchFullProgram = async() => {
            try {
                if (!name) {
                    throw new Error("El parámetro 'name' es undefined");
                }

                const response: FullProgramRaw = await getFullProgram(name)
                const programsFetched = {
                    ...response,
                    image: `${import.meta.env.VITE_API_URL}${response.image}`
                }

                const programCourses = toProgramCourse(programsFetched.programCourses);
                setProgram({
                    ...programsFetched,
                    programCourses
                })
            } catch (error) {
                setProgram(fullProgramExample)
                console.error("No se ha podido obtener los programas academicos")
            }
        }

        fetchFullProgram()
    }, [])

    return program
} 