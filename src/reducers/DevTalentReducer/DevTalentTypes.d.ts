import { Course, Program } from "../../consts/types"

export interface DevTalentState {
    item: number,
    microlearning: any,
    courses: Course[],
    certification: Program[],
    especialization: Program[],
    master: Program[],
    phd: Program[]
}

export interface DevTalentAction {
    type: ActionType,
    payload: any
}