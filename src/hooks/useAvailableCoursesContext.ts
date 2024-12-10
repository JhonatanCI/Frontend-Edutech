import { useContext } from "react";
import { AvailableCoursesContext } from "../context/availableCoursesContext";

export const useAvailableCoursesContext = () => {
    const context = useContext(AvailableCoursesContext);

    if (!context) {
        throw new Error("AvailableCoursesContext debe estar dentro del proveedor AvailableCoursesProvider");
    }

    return context;
};