import { API } from "../config/axios";
import { SimpleLearningResult } from "../model/types";

export const getAllCourses = async() => {
    try {
        const response = await API.get(`/courses/all`)
        return response.data
    } catch (error) {
        throw error;
    }
}


export const getAllProgramCourses = async(name: string) => {
    try {
        const response = await API.get(`/courses/program/${name}`)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getFullCourse = async(name: string) => {
    try {
        const response = await API.get(`/courses/name/${name}`)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getMatched = async(learningResults: SimpleLearningResult[]) => {
    try {
        const response = await API.post(`/courses/findMatched`, learningResults)
        return response.data
    } catch (error) {
        throw error;
    }
}