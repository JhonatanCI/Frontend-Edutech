import { Course, Program } from "../../consts/types"

export interface DevTalentState {
    item: number,
    microlearnings: any,
    courses: Course[],
    certifications: Program[],
    especializations: Program[],
    masters: Program[],
    phd: Program[]
}

export interface DevTalentAction {
    type: ActionType,
    payload: any
}