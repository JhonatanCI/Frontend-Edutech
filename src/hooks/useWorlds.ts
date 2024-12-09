import { useState, useEffect } from "react";
import { getAllWorlds } from "../services/academicWorlds";

import { defaultWorlds } from "../consts/worlds.d";
import { World } from "../model/types";

export const useWorlds = () => {
    const [worlds, setWorlds] = useState(defaultWorlds)
    
    useEffect(() => {
        const fetchWorlds = async() => {
            try {
                const response: World[] = await getAllWorlds()
                const worldsFetched = response.map(world => ({
                    ...world,
                    image: `${import.meta.env.VITE_API_URL}${world.image}`
                }));
                setWorlds(worldsFetched)
            } catch (error) {
                console.error("No se ha podido obtener los mundos")
            }
        }

        fetchWorlds()
    }, [])

    return worlds
} 