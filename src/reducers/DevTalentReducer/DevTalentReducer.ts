import { useReducer } from "react"
import { defaultCourses } from "../../consts/courses.d"
import { defaultCertifications, defaultEspecializations, defaultMasters, defaultPHD } from "../../consts/devtalentconsts.d"
import { DevTalentState, DevTalentAction } from "./DevTalentTypes"


const initialState: DevTalentState = {
    item: 0,
    microlearnings: defaultCourses,
    courses: defaultCourses,
    certifications: defaultCertifications,
    especializations: defaultEspecializations,
    masters: defaultMasters,
    phd: defaultPHD
}

export enum ActionType {
    UPDATE_ITEM = "update"
}

const reducer = (state: DevTalentState, action: DevTalentAction) => {
    const {type, payload} = action

    switch (type) {
        case ActionType.UPDATE_ITEM:
            return {
                ...state,
                item: payload
            };
        default:
            return state;
    }

}

const DevTalentReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const updateItemSelected = (itemSelected: number) => dispatch({type: ActionType.UPDATE_ITEM, payload: itemSelected})

    return {state, updateItemSelected}
}

export default DevTalentReducer