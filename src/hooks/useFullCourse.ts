import { useState, useEffect } from "react";
import { Course } from "../model/types";
import { getFullCourse } from "../services/academicCourses";

import { defaultCourses } from "../consts/courses.d";

export const useFullCourse = (name: string | undefined) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!name) {
          throw new Error("El parámetro 'name' es undefined");
        }

        // Decodificar el nombre si viene de la URL
        const decodedName = decodeURIComponent(name);
        const response: Course = await getFullCourse(decodedName);
        setCourse(response);
      } catch (error) {
        console.error(
          "No se ha podido obtener el curso, cargando curso por defecto",
        );
        setCourse(defaultCourses[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [name]);

  return { course, loading };
};
