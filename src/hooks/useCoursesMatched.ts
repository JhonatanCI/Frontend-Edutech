import { useState, useEffect } from "react";

import { Course, SimpleLearningResult } from "../model/types";
import { getMatched } from "../services/academicCourses";

const useCoursesMatched = (learningResults: SimpleLearningResult[]) => {
    const [courses, setCourses] = useState<Course[] | null>(null)
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response: Course[] = await getMatched(learningResults);
                setCourses(response);
            } catch (error) {
                console.error("No se ha podido cargar las opciones de cursos para intercambiar");
            }
        };
    
        if (learningResults.length > 0) {
            fetchCourses();
        }
    }, [learningResults]);

    return courses
}

export default useCoursesMatched