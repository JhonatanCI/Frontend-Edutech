import { API } from "../config/axios";

export const getMicroLearning = async(name: string) => {
    try {
        const response = await API.get(`/microlearnings/name/${name}`)
        return response.data
    } catch (error) {
        throw error;
    }
}