import { useEffect, useState } from "react";
import { getMatched } from "../services/academicCourses";
import { Course, UUID } from "../model/types";

const useCoursesMatched = (courseId: UUID) => {
    const [matchedCourses, setMatchedCourses] = useState<Course[] | null>(null);

    useEffect(() => {
        if (!courseId) {
            setMatchedCourses(null);
            return;
        }
        getMatched(courseId)
            .then(setMatchedCourses)
            .catch(() => setMatchedCourses([]));
    }, [courseId]);

    return matchedCourses;
};

export default useCoursesMatched;