import { LeadRepository, GetUserScore } from "@/domain/contracts";
import { NoDataFoundError } from "@/domain/entities";

export type GetUserScore = (params: { idUser: string; }) => Promise<GetUserScore.Output>;

type Setup = (leadRepo: LeadRepository) => GetUserScore;

export const setupUserScore: Setup = (leadRepo) => async (params) => {
  const { idUser } = params;

  const leadScore = await leadRepo.getById({
    idUser
  });
  
  if (!leadScore) throw new NoDataFoundError("SCORE não cadastrado para este usuário!");

  return leadScore;
};
