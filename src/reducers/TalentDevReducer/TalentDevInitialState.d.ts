import { useEffect } from "react";
import { defaultCourses } from "../../consts/courses.d";
import { defaultCertifications, defaultSpecializations, defaultMasters, defaultPHD } from "../../consts/talentdevconsts.d";
import { TalentDevState } from "./TalentDevTypes.d";

export const talentDevInitialState: TalentDevState = {
    item: 0,
    microLearnings: defaultCourses,
    courses: defaultCourses,
    certifications: defaultCertifications,
    specializations: defaultSpecializations,
    masters: defaultMasters,
    phd: defaultPHD
}