import { useParams } from "react-router-dom";
import AvailableCoursesProvider from "../context/availableCoursesContext";
import ProgramViewContent from "../components/ProgramView/ProgramViewContent";

import { useFullProgram } from "../hooks/useFullProgram";

export const ProgramView = () => {
    const { name } = useParams();
    const { program, isLoading } = useFullProgram(name);

    if (isLoading || !program) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <AvailableCoursesProvider>
            <ProgramViewContent program={program}/>
        </AvailableCoursesProvider>
    );
};