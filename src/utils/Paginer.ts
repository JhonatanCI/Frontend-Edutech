import { Result } from "../consts/types";

export const Paginer = (result: Result) => {
    return {
        microLearnings: result.microLearnings.slice(0, 9),
        courses: result.courses.slice(0, 9),
        certifications: result.certifications.slice(0, 3),
        specializations: result.specializations.slice(0, 3),
        masters: result.masters.slice(0, 3),
        phd: result.phd.slice(0, 3)
    }
}