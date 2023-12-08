import { GenerateScore, setupCreateScore } from "@/domain/useCases";
import { makeLeadRepo } from "@/main/factories/infrastructure";

export const makeCreateLead = (): GenerateScore => {
  return setupCreateScore(makeLeadRepo());
};
