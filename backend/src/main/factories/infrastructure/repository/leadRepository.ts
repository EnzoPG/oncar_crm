import { LeadRepositoryMongoDb } from "@/infrastructure/repository";
export const makeLeadRepo = (): LeadRepositoryMongoDb => {
  return new LeadRepositoryMongoDb();
};
