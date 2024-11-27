import { API } from "../config/axios";

export const getAllPrograms = async() => {
    try {
        const response = await API.get("/programs")
        return response.data
    } catch (error) {
        throw error;
    }
}