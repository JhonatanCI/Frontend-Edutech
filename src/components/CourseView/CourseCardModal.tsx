import React, { useState, useEffect } from "react";
import CourseModal from "./CourseModal";
import { ProgramCourse } from "../../model/types";
import CourseCard from "../Commons/CourseCard";

interface CourseCardModalProps {
    course: ProgramCourse,
    categories: string[],
    variant: "small" | "medium" | "large",
    variantStyle?: "solid" | "dashed",
    isEditable?: boolean
}

const CourseCardModal: React.FC<CourseCardModalProps> = ({course, categories, variant, variantStyle, isEditable}) => {

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (isSelected) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [isSelected]);

    const handleClick = () => {
        isEditable && setIsSelected(true)
    }

    return (
        <div>
            {(isEditable && isSelected) && (
                <CourseModal
                    course={course}
                    onClose={() => setIsSelected(false)}
                />
            )}
            <CourseCard
                key={course.courseId}
                title={course.name}
                description={course.description}
                categories={categories}
                credits={course.credits}
                isEditable
                variantStyle={variantStyle}
                variant={variant}
                onClick={handleClick}
            />
        </div>
    )
}

export default CourseCardModal