import React from "react";
import CourseView from "../../pages/CourseView";
import { ProgramCourse } from "../../model/types";
import CourseSwap from "./CourseSwap";
import { useAvailableCoursesContext } from "../../hooks/useAvailableCoursesContext";

interface CourseModalProps {
    course: ProgramCourse;
    onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({course, onClose}) => {
    const { resetCourse } = useAvailableCoursesContext();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal Container */}
            <div className="relative bg-white rounded-lg w-[80rem] h-[40rem] shadow-lg overflow-hidden modal-scrollable">
                {/* Close Button */}
                <div className="absolute top-4 right-4 flex gap-4 z-50">
                    {course.swapped && (
                        <button
                            onClick={() => resetCourse(course)}
                            className="text-sm bg-white border border-gray-400 text-black px-3 py-1 rounded hover:bg-gray-100 shadow"
                        >
                            Resetear
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="text-gray-700 hover:text-black text-2xl"
                    >
                        ✖
                    </button>
                </div>
                {/* Render CourseView */}
                <CourseView course={course} />
                {course.father && (
                    <CourseSwap course={course} close={onClose} />
                )}
            </div>
        </div>
    );
};

export default CourseModal;