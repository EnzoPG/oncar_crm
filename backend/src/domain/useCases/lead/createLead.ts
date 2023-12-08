import { LeadRepository, GenerateScore } from "@/domain/contracts";
import { DataAlreadyExistsError } from "@/domain/entities";
import { formatDateTime } from "@/domain/entities/helpers";

export type GenerateScore = (params: { idUser: string; }) => Promise<GenerateScore.Output>;

type Setup = (leadRepo: LeadRepository) => GenerateScore;

export const setupCreateScore: Setup = (leadRepo) => async (params) => {
  const { idUser } = params;

  const score = Math.floor(Math.random() * (1000 - 0 + 1) + 0);

  const userScore = await leadRepo.create({
    idUser,
    score,
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
  });

  return userScore;
};
