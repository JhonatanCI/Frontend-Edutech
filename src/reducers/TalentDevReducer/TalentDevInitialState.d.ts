import { defaultCourses } from "../../consts/courses.d";
import { defaultCertifications, defaultSpecializations, defaultMasters, defaultPHD } from "../../consts/talentdevconsts.d";
import { TalentDevState } from "./TalentDevTypes.d";
import { Result } from "../../model/types";

const initValue: Result = {
    microLearnings: null,
    courses: null,
    certifications: null,
    specializations: null,
    masters: null,
    phd: null
}


export const talentDevInitialState: TalentDevState = {
    initialValue: initValue,
    item: 0,
    microLearnings: null,
    courses: null,
    certifications: null,
    specializations: null,
    masters: null,
    phd: null,
}