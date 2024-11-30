import { API } from "../config/axios";

export const getAllPrograms = async(page: number, size: number) => {
    try {
        const response = await API.get(`/programs?page=${page}&size=${size}`)
        return response.data.content
    } catch (error) {
        throw error;
    }
}