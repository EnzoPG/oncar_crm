import { GetUserScore, setupUserScore } from "@/domain/useCases";
import { makeLeadRepo } from "../../infrastructure";

export const makeUserScore = (): GetUserScore => {
  return setupUserScore(makeLeadRepo());
};
