import { AdminRepositoryMongoDb } from "@/infrastructure/repository";
export const makeAdminRepo = (): AdminRepositoryMongoDb => {
  return new AdminRepositoryMongoDb();
};
