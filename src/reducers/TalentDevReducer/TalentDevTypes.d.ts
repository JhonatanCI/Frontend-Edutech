import { Course, MicroLearning, Program, Result } from "../../model/types"

export interface TalentDevState {
    initialValue: Result,
    item: number,
    microLearnings: MicroLearning[],
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