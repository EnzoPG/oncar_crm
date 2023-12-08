import Mongoose from "mongoose";

import { Lead } from "@/domain/entities";
import { LeadRepository, GenerateScore, GetUserScore } from "@/domain/contracts";

const leadSchema = new Mongoose.Schema<Lead>({
  idUser: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: String },
  updatedAt: { type: String },
  deletedAt: { type: String },
});

const leadDocument = Mongoose.model<Lead>("Lead", leadSchema);

export class LeadRepositoryMongoDb implements LeadRepository {
  async create(input: GenerateScore.Input): Promise<GenerateScore.Output> {
    const lead = await leadDocument.create({
      ...input,
    });
    return new Lead(lead);
  }

  async getById(input: GetUserScore.Input): Promise<GetUserScore.Output> {
    const lead = await leadDocument.findOne({ idUser: input.idUser, deletedAt: null }, {}, { sort: { createdAt : -1 } });
    return new Lead(lead);
  }
}
