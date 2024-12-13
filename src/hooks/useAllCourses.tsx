import { useState, useEffect } from "react";

import { Course } from "../model/types";
import { getAllCourses } from "../services/academicCourses";

const useAllCourses = () => {
    const [courses, setCourses] = useState<Course[] | null>(null)
    
    useEffect(() => {
        const fetchCourses = async() => {
            try {
                const response: Course[] = await getAllCourses();
                setCourses(response)
            } catch (error) {
                console.error("No se ha podido cargar las opciones de cursos para intercambiar")
            }
        }

        fetchCourses()
    }, [])

    return courses
}

export default useAllCourses