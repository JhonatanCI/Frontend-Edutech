import { API } from "../config/axios";
import { SimpleOutcome } from "../model/types";

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

export const getMatched = async(outcomes: SimpleOutcome[]) => {
    try {
        const response = await API.post(`/courses/findMatched`, outcomes)
        return response.data
    } catch (error) {
        throw error;
    }
}