import { ProgramCourse } from "../../model/types"

export enum ACActionType {
    INITIAL_STATE = "initial_state",
    UPDATE_STATE = "update_state"
}

export type ACPayload = {
    current: ProgramCourse,
    newCourse: ProgramCourse
}