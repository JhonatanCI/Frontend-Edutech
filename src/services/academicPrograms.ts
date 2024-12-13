import { API } from "../config/axios";
import { UUID } from "../model/types";

export const getAllPrograms = async(page: number, size: number) => {
    try {
        const response = await API.get(`/programs?page=${page}&size=${size}`)
        return response.data.content
    } catch (error) {
        throw error;
    }
}

export const getFullProgram = async(name: string) => {
    try {
        const response = await API.get(`/programs/name/${name}`)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getAchievements = async(courseIds: UUID[]) => {
    try {
        const response = await API.post("/search/findAchievements", courseIds)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getLearningPath = async(courseIds: UUID[]) => {
    try {
        const response = await API.post("/search/findLearningPath", courseIds)
        return response.data
    } catch (error) {
        throw error;
    }
}