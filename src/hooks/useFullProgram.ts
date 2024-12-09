import { useState, useEffect } from "react";
import { FullProgram } from "../model/types";
import { getFullProgram } from "../services/academicPrograms";

import { fullProgramExample } from "../consts/fullconsts.d";

export const useFullProgram = (name: string | undefined) => {
    const [program, setProgram] = useState<FullProgram | null>(null)
    
    useEffect(() => {
        const fetchFullProgram = async() => {
            try {
                if (!name) {
                    throw new Error("El parámetro 'name' es undefined");
                }

                const response: FullProgram = await getFullProgram(name)
                const programsFetched = {
                    ...response,
                    image: `${import.meta.env.VITE_API_URL}${response.image}`
                }
  
                setProgram(programsFetched)
            } catch (error) {
                setProgram(fullProgramExample)
                console.error("No se ha podido obtener los programas academicos")
            }
        }

        fetchFullProgram()
    }, [])

    return program
} 