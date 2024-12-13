import { API } from "../config/axios"


export const getGeneralResults = async() => {
    try {
        const response = await API.get("/search/general")
        return response.data
    } catch (error) {
        throw error
    }
}

export const getResults = async(query: string) => {
    try {
        const response = await API.get(`/search?query=${query}`)
        return response.data
    } catch (error) {
        throw error
    }
}