import { useState, useEffect } from "react";
import { getAllPrograms } from "../services/academicPrograms";

import defaultPrograms from "../consts/programs.d";
import { Program } from "../model/types";

export const usePrograms = (page: number, size: number) => {
    const [programs, setPrograms] = useState(defaultPrograms)
    
    useEffect(() => {
        const fetchPrograms = async() => {
            try {
                const response: Program[] = await getAllPrograms(page, size);
                const programsFetched = response.map(program => ({
                    ...program,
                    image: `${import.meta.env.VITE_API_URL}${program.image}`
                }));
                setPrograms(programsFetched)
            } catch (error) {
                console.error("No se ha podido obtener los programas academicos")
            }
        }

        fetchPrograms()
    }, [])

    return programs
} 