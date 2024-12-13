import { useState, useEffect } from "react";
import { FullProgram } from "../model/types";
import { getFullProgram } from "../services/academicPrograms";

import { fullProgramExample } from "../consts/fullconsts.d";

export const useFullProgram = (name: string | undefined) => {
    const [program, setProgram] = useState<FullProgram | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar carga

    useEffect(() => {
        const fetchFullProgram = async () => {
            setIsLoading(true); // Inicia la carga
            try {
                if (!name) {
                    throw new Error("El parámetro 'name' es undefined");
                }

                const response: FullProgram = await getFullProgram(name);
                const programsFetched = {
                    ...response,
                    image: `${import.meta.env.VITE_API_URL}${response.image}`,
                };

                setProgram(programsFetched);
            } catch (error) {
                setProgram(fullProgramExample);
                console.error("No se ha podido obtener los programas académicos");
            } finally {
                setIsLoading(false); // Finaliza la carga
            }
        };

        fetchFullProgram();
    }, [name]); // Dependencia para ejecutar el efecto cuando cambia el nombre

    return { program, isLoading }; // Retorna también el estado de carga
};