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
                ...payload,
                initialValue: payload
            }
        case ActionType.UPDATE_STATE:
            return {
                ...state,
                ...payload
            }
        case ActionType.RESET:
            return {
                ...state,
                microLearnings: state.initialValue.microLearnings,
                courses: state.initialValue.courses,
                certifications: state.initialValue.certifications,
                specializations: state.initialValue.specializations,
                masters: state.initialValue.masters,
                phd: state.initialValue.phd
            }
        default:
            return state;
    }

}

export default talentDevReducer