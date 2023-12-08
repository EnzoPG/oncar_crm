import { Lead } from "@/domain/entities";

export interface LeadRepository {
  create: (params: GenerateScore.Input) => Promise<GenerateScore.Output>;
  getById: (params: GetUserScore.Input) => Promise<GetUserScore.Output>;
}

type TypeLead = {
  idUser: string;
  score: number;
  createdAt: string;
  updatedAt: string;
};

export namespace GenerateScore {
  export type Input = TypeLead;
  export type Output = Lead;
}

export namespace GetUserScore {
  export type Input = { idUser: string };
  export type Output = Lead;
}
