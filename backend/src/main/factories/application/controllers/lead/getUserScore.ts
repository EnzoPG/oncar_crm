import { GetUserScoreController } from "@/application/controllers";
import { makeUserScore } from "@/main/factories/useCases";

export const makeGetUserScoreController = () => {
  return new GetUserScoreController(makeUserScore());
};
