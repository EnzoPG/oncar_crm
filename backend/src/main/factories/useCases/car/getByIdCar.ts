import { GetByIdCar, setupGetByIdCar } from "@/domain/useCases";
import { makeCarRepo, makeBcryptUtils } from "@/main/factories/infrastructure";

export const makeGetByIdCar = (): GetByIdCar => {
  return setupGetByIdCar(makeCarRepo());
};
