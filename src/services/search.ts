import { API } from "../config/axios"


export const getGeneralResults = async() => {
    try {
        const response = await API.get("/search")
        return response.data
    } catch (error) {
        throw error
    }
}