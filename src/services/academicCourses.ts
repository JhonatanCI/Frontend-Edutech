import { API } from "../config/axios";
import { UUID } from "../model/types";

export const getAllProgramCourses = async(programId: UUID) => {
    try {
        const response = await API.get(`/courses/program/${programId}`)
        return response.data
    } catch (error) {
        throw error;
    }
}