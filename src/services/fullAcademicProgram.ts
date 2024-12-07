import { API } from "../config/axios";

export const getFullProgram = async(name: string) => {
    try {
        const response = await API.get(`/programs/name/${name}`)
        return response.data
    } catch (error) {
        throw error;
    }
}