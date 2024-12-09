import { API } from "../config/axios";

export const getAllProgramCourses = async(name: string) => {
    try {
        const response = await API.get(`/courses/program/${name}`)
        return response.data
    } catch (error) {
        throw error;
    }
}