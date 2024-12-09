import { defaultCourses } from "../../consts/courses.d";
import { defaultCertifications, defaultSpecializations, defaultMasters, defaultPHD } from "../../consts/talentdevconsts.d";
import { TalentDevState } from "./TalentDevTypes.d";
import { Result } from "../../model/types";

const initValue: Result = {
    microLearnings: defaultCourses,
    courses: defaultCourses,
    certifications: defaultCertifications,
    specializations: defaultSpecializations,
    masters: defaultMasters,
    phd: defaultPHD
}


export const talentDevInitialState: TalentDevState = {
    initialValue: initValue,
    item: 0,
    microLearnings: defaultCourses,
    courses: defaultCourses,
    certifications: defaultCertifications,
    specializations: defaultSpecializations,
    masters: defaultMasters,
    phd: defaultPHD
}