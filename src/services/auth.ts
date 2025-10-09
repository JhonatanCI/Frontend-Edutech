import { API } from "../config/axios"


export const getGeneralResults = async() => {
    try {
        const response = await API.get("/auth/register")
        return response.data
    } catch (error) {
        throw error
    }
}

export const getResults = async(query: string) => {
    try {
        const response = await API.get(`/auth/login`)
        return response.data
    } catch (error) {
        throw error
    }
}