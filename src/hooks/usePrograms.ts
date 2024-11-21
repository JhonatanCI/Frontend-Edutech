import { useState, useEffect } from "react";
import { getAllPrograms } from "../services/academicPrograms";

import { defaultPrograms } from "../consts/consts.d";

export const usePrograms = () => {
    const [programs, setPrograms] = useState(defaultPrograms)
    
    useEffect(() => {
        const fetchPrograms = async() => {
            try {
                const programsFetched = await getAllPrograms()
                setPrograms(programsFetched)
            } catch (error) {
                console.error("No se ha podido obtener los programas academicos")
            }
        }

        fetchPrograms()
    }, [])

    return programs
} 