import { useReducer } from "react"
import { defaultCourses } from "../../consts/courses.d"

const initialState: DevTalentState = {
    item: 0,
    microlearning: defaultCourses,
    courses: defaultCourses,
    certification: [],
    especialization: [],
    master: [],
    phd: []
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