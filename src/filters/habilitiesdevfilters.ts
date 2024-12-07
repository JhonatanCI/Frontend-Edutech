import { ProgramOutcome } from "../model/types";

export const getMaxValue = (programOutcomes: ProgramOutcome[]) => {
    return programOutcomes.reduce((max, outcome) => {
      return outcome.maxCredits > max ? outcome.maxCredits : max;
    }, 0);
};

export const getCategories = (programOutcomes: ProgramOutcome[]) => {
    return programOutcomes.map(outcome => outcome.outcome.name);
};

export const getOutcomeValues = (programOutcomes: ProgramOutcome[]) => {
  return programOutcomes.map(outcome => outcome.maxCredits);
};