import { CarRepositoryMongoDb } from "@/infrastructure/repository";
export const makeCarRepo = (): CarRepositoryMongoDb => {
  return new CarRepositoryMongoDb();
};
