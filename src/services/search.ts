import { API } from "../config/axios"


export const getGeneralResults = async() => {
    try {
        const response = await API.get("/search")
        return response.data
    } catch (error) {
        throw error
    }
}

export const getResults = async(input: string) => {
    try {
        const response = await API.get(`/search?worldName=${input}`)
        return response.data
    } catch (error) {
        throw error
    }
}