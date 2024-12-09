import { useState, useEffect } from "react";
import { MicroLearning } from "../model/types";
import { getMicroLearning } from "../services/microLearnings";

export const useFullMicroLearning = (name: string | undefined) => {
    const [microLearning, setMicroLearning] = useState<MicroLearning | null>(null)

    useEffect(() => {
        const fetchFullMicroLearning = async () => {
            try {
                if (!name) {
                    throw new Error("El parámetro 'name' es undefined");
                }

                const response: MicroLearning = await getMicroLearning(name)
                setMicroLearning(response)
            } catch (error) {

                setMicroLearning({
                    id: "3e6bdc69-7f79-4545-a1e6-dcc65cd0f6a1",
                    name: "Diplomado de prueba",
                    description: "Una descripción x",
                    modality: "VIRTUAL",
                    type: "DIPLOMADO"
                })
                console.error("No se ha podido obtener el micro aprendizaje")
            }
        }

        fetchFullMicroLearning()
    }, [])

    return microLearning
} 