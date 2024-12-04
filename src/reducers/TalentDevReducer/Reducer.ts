import { TalentDevAction, TalentDevState } from "./TalentDevTypes";
import { ActionType } from "./TalentDevActions";

const talentDevReducer = (state: TalentDevState, action: TalentDevAction) => {
    const {type, payload} = action

    switch (type) {
        case ActionType.UPDATE_ITEM:
            return {
                ...state,
                item: payload
            };
        case ActionType.INITIAL_STATE:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }

}

export default talentDevReducer