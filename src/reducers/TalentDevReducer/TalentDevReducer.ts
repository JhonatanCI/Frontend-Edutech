import { useReducer } from "react"
import { talentDevInitialState } from "./TalentDevInitialState.d"
import { Result } from "../../model/types"
import { ActionType } from "./TalentDevActions"
import talentDevReducer from "./Reducer"

const initialState = talentDevInitialState
const reducer = talentDevReducer

const useTalentDev = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const updateItemSelected = (itemSelected: number) => dispatch({type: ActionType.UPDATE_ITEM, payload: itemSelected})
    const setItems = (items: Result) => dispatch({type: ActionType.INITIAL_STATE, payload: items})
    const updateItems = (items: Result) => dispatch({type: ActionType.UPDATE_STATE, payload: items})
    const reset = () => dispatch({type: ActionType.RESET, payload: null})

    return {state, updateItemSelected, setItems, updateItems, reset}
}

export default useTalentDev