import { useState, useEffect } from "react";
import { getAllWorlds } from "../services/academicWorlds";

import { defaultWorlds } from "../consts/consts.d";

export const useWorlds = () => {
    const [worlds, setWorlds] = useState(defaultWorlds)
    
    useEffect(() => {
        const fetchWorlds = async() => {
            try {
                const worldsFetched = await getAllWorlds()
                setWorlds(worldsFetched)
            } catch (error) {
                console.error("No se ha podido obtener los mundos")
            }
        }

        fetchWorlds()
    }, [])

    return worlds
} 