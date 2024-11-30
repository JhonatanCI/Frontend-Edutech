import { API } from "../config/axios"

export const getAllWorlds = async() => {
    try {
        const response = await API.get("/worlds")
        return response.data.content
    } catch (error) {
        throw error;
    }
}