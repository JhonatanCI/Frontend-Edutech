import { useState, useEffect } from "react";

import { Course, SimpleOutcome } from "../model/types";
import { getMatched } from "../services/academicCourses";

const useCoursesMatched = (outcomes: SimpleOutcome[]) => {
    const [courses, setCourses] = useState<Course[] | null>(null)
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response: Course[] = await getMatched(outcomes);
                setCourses(response);
            } catch (error) {
                console.error("No se ha podido cargar las opciones de cursos para intercambiar");
            }
        };
    
        if (outcomes.length > 0) {
            fetchCourses();
        }
    }, [outcomes]);

    return courses
}

export default useCoursesMatched