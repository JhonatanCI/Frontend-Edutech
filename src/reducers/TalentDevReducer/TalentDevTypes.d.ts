import { Course, Program, Result } from "../../consts/types"

export interface TalentDevState {
    item: number,
    microLearnings: any,
    courses: Course[],
    certifications: Program[],
    specializations: Program[],
    masters: Program[],
    phd: Program[]
}

export interface TalentDevAction {
    type: ActionType,
    payload: Result | any
}