import React from "react";
import CourseView from "../../pages/CourseView";
import { ProgramCourse } from "../../model/types";
import CourseSwap from "./CourseSwap";

interface CourseModalProps {
    course: ProgramCourse;
    onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({course, onClose}) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal Container */}
            <div className="relative bg-white rounded-lg w-[80rem] h-[40rem] shadow-lg overflow-hidden modal-scrollable">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-700 hover:text-black text-2xl z-50"
                >
                    ✖
                </button>
                {/* Render CourseView */}
                <CourseView course={course} />
                <CourseSwap course={course} close={onClose}/>
            </div>
        </div>
    );
};

export default CourseModal;